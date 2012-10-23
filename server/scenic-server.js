var web = require('./web'),
    socket = require('./socket'),
    settings = require('../settings');

function scenic() {
    // create express3 web server
    this.web = new web();

    // create socket listening on express3
    this.socket = new socket(this.web.server);
}

scenic.prototype.run = function() {
    this.web.run();
    console.log('Scenic is running on port %s!', settings.port);
}

module.exports = scenic;
