var handlers = {
    index: function() {
        window.app_view.render({page: 'index'});

        // delete socket if exists
        if(window.socket) {
            window.socket.disconnect();
            window.socket = null;
        }
    },

    channel: function(channel) {
        window.app_view.render({page: 'channel', channel: channel});

        // create new socket.io socket
        if(window.socket) window.socket.disconnect();
        window.socket = new Socket();
    }
}
