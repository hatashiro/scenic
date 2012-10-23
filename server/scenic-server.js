var web = require('./web'),
    settings = require('../settings');

function scenic() {
    var scenic = this;

    scenic.web = new web();

    return scenic;
}

scenic.prototype.run = function() {
    this.web.run();
    console.log('Scenic is running on port %s!', settings.port);
}

module.exports = scenic;
