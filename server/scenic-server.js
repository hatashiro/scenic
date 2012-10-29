// register mongoose models.
require('./models')();

var web = require('./web'),
    socket = require('./socket'),
    settings = require('../settings'),
    mongoose = require('mongoose');

function scenic() {
    // create express3 web server
    this.web = new web();

    // create socket listening on express3
    this.web.socket = new socket(this.web.server);
}

scenic.prototype.run = function() {
    // connect mongoose
    mongoose.connect(settings.mongo_uri);

    this.web.run();
    console.log('Scenic is running on port %s!', settings.port);
}

module.exports = scenic;
