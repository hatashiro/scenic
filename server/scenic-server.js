// register mongoose models.
(require('./models')());

var Web = require('./web'),
    Socket = require('./socket'),
    settings = require('../settings'),
    mongoose = require('mongoose');

function Scenic() {
    // create express3 web server
    this.web = new Web();

    // create socket listening on express3
    this.web.socket = new Socket(this.web.server);
}

Scenic.prototype.run = function() {
    // connect mongoose
    mongoose.connect(settings.mongo_uri);

    this.web.run();
    console.log('Scenic is running on port %s!', settings.port);
};

module.exports = Scenic;
