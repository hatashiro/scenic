function Socket(channel) {
    var _this = this;

    // connect server socket. Always create a new connection.
    this.io = io.connect('/', {'force new connection':true});
    this.channel = channel;

    this.io.on('connected', function(data) {
        console.log('Scenic socket connected.');

        if(window.nick_in_use) {
            // if there's already global nickname in use, use it.
            _this.io.emit('create_user', {nick: window.nick_in_use});
        }
        else {
            // else, show set nickname dialog
            (new SetNickDialogView(function(nick) {
                _this.io.emit('create_user', {nick: nick});
            }));
        }

        // create chat view
        window.chat_view = new ChatView();
    });

    this.io.on('user_created', function(data) {
        _this.io.emit('join_channel', {'channel': _this.channel});
    });

    this.io.on('channel_joined', function(data) {
        // set the nickname in use
        window.nick_in_use = data.nick;

        window.chat_view.setNick(data.nick);
        window.app_view.navbar_view.setNick(data.nick);
        window.app_view.navbar_view.setChangeNickHandler(function(e) {
            (new ChangeNickDialogView(function(nick) {
                _this.io.emit('change_nick', {nick: nick});
            }));
        });
        window.app_view.navbar_view.setMoveChannelHandler(function(e) {
            (new MoveChannelDialogView());
        });
        window.app_view.navbar_view.setUploadPicHandler(function(e) {
            (new UploadPicDialogView(_this.channel));
        });
        window.app_view.navbar_view.setShowPicHandler(function(e) {
            if($('#ShowPictures').length) {
                $('#ShowPictures').data('view').remove();
            }
            else {
                (new ShowPicturesView(_this.channel, function(pid) {
                    _this.io.emit('change_picture', {channel: _this.channel, pid: pid});
                }));
            }
        });

        window.chat_view.focusInput();

        // set chat handler
        window.chat_view.onChatInput(function(msg) {
            _this.io.emit('chat', {msg: msg});
        });

        // load image
        if(data.picture !== null) {
            window.app_view.main_view.render(data.picture.id, {width: data.picture.width, height: data.picture.height});
        }
        else {
            window.app_view.main_view.render();
        }
    });

    this.io.on('chat', function(data) {
        window.chat_view.chatlog(data.from, data.msg, data.from_me);
    });

    this.io.on('notice', function(data) {
        window.chat_view.notice(data.msg);
    });

    this.io.on('nick_changed', function(data) {
        // set the nickname in use
        window.nick_in_use = data.nick;

        window.chat_view.setNick(data.nick);
        window.app_view.navbar_view.setNick(data.nick);
    });

    this.io.on('update_userlist', function(data) {
        window.chat_view.updateUserlist(data.userlist);
    });

    this.io.on('picture_changed', function(data) {
        var pid = data.pid,
            width = data.width,
            height = data.height;

        window.app_view.main_view.render(pid, {width: width, height: height});
    });

    this.io.on('error', function(data) {
        // log the error
        console.log('Scenic socket exception: '+data.type);
    });

    this.disconnect = function() {
        window.chat_view.remove();
        window.chat_view = null;
        this.io.emit('force_disconnect');
        console.log('Scenic socket disconnected.');
    };
}
