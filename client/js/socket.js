function Socket() {
    // connect server socket. Always create a new connection.
    this.io = io.connect('/', {'force new connection':true});

    this.io.on('connected', function(data) {
        console.log('Scenic socket connected.');
    });

    this.io.on('error', function(data) {
        // log the error
        console.log('Scnic sockec exception: '+data.type);
    });

    this.disconnect = function() {
        window.chat_view.remove();
        delete(window.chat_view);
        this.io.emit('force_disconnect');
        console.log('Scenic socket disconnected.');
    }
}
