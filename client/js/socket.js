function Socket(channel) {
    var _this = this;

    // connect server socket. Always create a new connection.
    this.io = io.connect('/', {'force new connection':true});
    this.channel = channel;

    this.io.on('connected', function(data) {
        console.log('Scenic socket connected.');

        // show set nickname dialog
        (new SetNickDialogView(function(nick) {
            _this.io.emit('create_user', {nick: nick});
        }));

        // create chat view
        window.chat_view = new ChatView();
    });

    this.io.on('user_created', function(data) {
        _this.io.emit('join_channel', _this.channel);
    });

    this.io.on('channel_joined', function(data) {
        window.chat_view.setNick(data.nick);

        window.chat_view.focusInput();

        // set chat handler
        window.chat_view.onChatInput(function(msg) {
            _this.io.emit('chat', {msg: msg});
        });
    });

    this.io.on('chat', function(data) {
        window.chat_view.chatlog(data.from, data.msg, data.from_me);
    });

    this.io.on('notice', function(data) {
        window.chat_view.notice(data.msg);
    });

    this.io.on('error', function(data) {
        // log the error
        console.log('Scenic socket exception: '+data.type);
    });

    this.disconnect = function() {
        window.chat_view.remove();
        delete(window.chat_view);
        this.io.emit('force_disconnect');
        console.log('Scenic socket disconnected.');
    };
}
