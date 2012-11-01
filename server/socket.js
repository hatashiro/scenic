var socketio = require('socket.io'),
    settings = require('../settings'),
    mongoose = require('mongoose'),
    Channel = require('./classes').Channel,
    User = require('./classes').User;

var ChannelModel = mongoose.model('Channel'),
    PictureModel = mongoose.model('Picture');

function socket(web) {
    var io = this.io = socketio.listen(web);
    console.log('Socket.io now listening on Express');

    // channels
    var channels = this.channels = {};

    io.sockets.on('connection', function(socket) {
        var user = null;

        socket.emit('connected', {});

        socket.on('create_user', function(data) {
            if(!data.nick) {
                socket.emit('error', {type: 'EmptyNick'});
                return;
            }

            user = new User(data.nick, socket);
            socket.emit('user_created', {nick: user.nick});
        });

        socket.on('join_channel', function(data) {
            if(!user) {
                socket.emit('error', {type: 'NoUser'});
            }

            if(channels[data.channel]) {
                user.join(channels[data.channel]);
            }
            else {
                ChannelModel.find({name: data.channel}, function(err, channel_results) {
                    var channel = null;
                    if(channel_results.length) {
                        channel = channel_results[0];
                    }
                    else {
                        // create new
                        channel = new ChannelModel({name: data.channel, pictures: []});
                        channel.save();
                    }
                    channels[data.channel] = new Channel(channel);
                    user.join(channels[data.channel]);
                });
            }
        });

        socket.on('chat', function(data) {
            if(!user) {
                socket.emit('error', {type: 'NoUser'});
            }

            user.say(data.msg);
        });

        socket.on('change_nick', function(data) {
            if(!user) {
                socket.emit('error', {type: 'NoUser'});
            }

            user.changeNick(data.nick);
        });

        socket.on('force_disconnect', function() {
            if(user) {
                user.disconnect();
            }

            socket.disconnect();
        });

        socket.on('disconnect', function() {
            if(user) {
                user.disconnect();
            }
        });
    });
}

module.exports = socket;
