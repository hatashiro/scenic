var handlers = {
    index: function() {
        window.app_view.render({page: 'index'});
    },

    channel: function(channel) {
        window.app_view.render({page: 'channel', channel: channel});

        // create socket.io socket
        window.socket = new socket();
    }
}
