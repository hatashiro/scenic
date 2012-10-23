var socketio = require('socket.io'),
    settings = require('../settings');

function socket(web) {
    var io = this.io = socketio.listen(web);
    console.log('Socket.io now listening on Express');

    io.sockets.on('connection', function(socket) {
        socket.emit('hello', {hello: 'world'});
    });
}

module.exports = socket;
