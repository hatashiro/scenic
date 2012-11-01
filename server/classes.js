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
        }

        this.say = function(msg) {
            this.socket.emit('chat', {from: this.nick, msg: msg, from_me: true});
            this.channel.transmit(msg, from=this);
        }

        this.changeNick = function(nick) {
            var old_nick = this.nick;
            this.nick = nick;
            this.channel.preventNickDuplication(this);
            this.channel.notice(old_nick+" is now known as "+this.nick);
            this.socket.emit('nick_changed', {nick:this.nick});
            this.channel.updateUserlist();
        }

        this.disconnect = function() {
            if(this.channel) {
                this.channel.removeUser(this);
                this.channel.notice(this.nick+" has left.");
                this.channel.updateUserlist();
            }
        }
    },

    Channel: function(model) {
        this.model = model;
        this.users = [];
        this.current_image = null;

        this.addUser = function(user) {
            this.preventNickDuplication(user);
            this.users.push(user);
            user.channel = this;
        }

        this.removeUser = function(user) {
            this.users.splice(this.users.indexOf(user), 1);
        }

        this.preventNickDuplication = function(user) {
            while(this.nickDuplicated(user.nick)) {
                user.nick = user.nick + '_';
            }
        }

        this.nickDuplicated = function(nick) {
            var usernicks = [];
            for(var user in this.users) {
                usernicks.put(user.nick);
            }
            return (nick in usernicks);
        }

        this.transmit = function(msg, from) {
            _.each(this.users, function(user) {
                if(user != from) {
                    user.socket.emit('chat', {from: user.nick, msg: msg, from_me: false});
                }
            });
        };

        this.notice = function(msg) {
            _.each(this.users, function(user) {
                user.socket.emit('notice', {msg: msg});
            });
        };

        this.updateUserlist = function() {
            _.each(this.users, function(user) {
                user.socket.emit('update_userlist', {userlist: this.users});
            });
        };
    },
}
