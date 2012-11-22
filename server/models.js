var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function() {
    var Pictures = new Schema({
        original: String,
        thumbnail: String,
        minified: String,
        channel: String,
        width: Number,
        height: Number,
        uploaded: {'type': Date, 'default': Date.now }
    });

    var Channels = new Schema({
        name: String,
        pictures: [Pictures]
    });

    mongoose.model('Picture', Pictures);
    mongoose.model('Channel', Channels);
};
