var _ = require('underscore')._;

module.exports = {
    User: function(nick, socket) {
        this.nick = nick;
        this.socket = socket;
        this.channel = null;

        this.join = function(channel) {
            this.channel = channel;
            this.channel.addUser(this);
            this.channel.notice(this.nick+" has joined.");
            this.socket.emit('channel_joined', {nick:this.nick, channel: channel.model.name});
            this.channel.updateUserlist();
        };

        this.say = function(msg) {
            this.socket.emit('chat', {from: this.nick, msg: msg, from_me: true});
            this.channel.transmit(msg, from=this);
        };

        this.changeNick = function(nick) {
            if(this.nick == nick) {
                return;
            }

            var old_nick = this.nick;
            this.nick = nick;
            this.channel.preventNickDuplication(this);
            this.channel.notice(old_nick+" is now known as "+this.nick);
            this.socket.emit('nick_changed', {nick:this.nick});
            this.channel.updateUserlist();
        };

        this.disconnect = function() {
            if(this.channel) {
                this.channel.removeUser(this);
                this.channel.notice(this.nick+" has left.");
                this.channel.updateUserlist();
            }
        };
    },

    Channel: function(model) {
        this.model = model;
        this.users = [];
        this.current_image = null;

        this.addUser = function(user) {
            this.preventNickDuplication(user);
            this.users.push(user);
            user.channel = this;
        };

        this.removeUser = function(user) {
            if(this.users.indexOf(user) >= 0) {
                this.users.splice(this.users.indexOf(user), 1);
            }
        };

        this.preventNickDuplication = function(user) {
            while(this.nickDuplicated(user)) {
                user.nick = user.nick + '_';
            }
        };

        this.nickDuplicated = function(user) {
            var usernicks = [];
            for(var i in this.users) {
                if(this.users[i] != user) {
                    usernicks.push(this.users[i].nick);
                }
            }
            return _.contains(usernicks, user.nick);
        };

        this.transmit = function(msg, from) {
            _.each(this.users, function(user) {
                if(user != from) {
                    user.socket.emit('chat', {from: from.nick, msg: msg, from_me: false});
                }
            });
        };

        this.notice = function(msg) {
            _.each(this.users, function(user) {
                user.socket.emit('notice', {msg: msg});
            });
        };

        this.updateUserlist = function() {
            var userlist = [];
            for(var i in this.users) {
                userlist.push(this.users[i].nick);
            }
            _.each(this.users, function(user) {
                user.socket.emit('update_userlist', {userlist: userlist});
            });
        };
    }
};
