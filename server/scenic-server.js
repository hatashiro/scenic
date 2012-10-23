var web = require('./web'),
    socket = require('./socket'),
    settings = require('../settings');

function scenic() {
    var scenic = this;

    // create express3 web server
    scenic.web = new web();

    // create socket listening on express3
    scenic.socket = new socket(scenic.web.server);

    return scenic;
}

scenic.prototype.run = function() {
    this.web.run();
    console.log('Scenic is running on port %s!', settings.port);
}

module.exports = scenic;
