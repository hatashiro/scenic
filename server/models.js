var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function() {
    var Pictures = new Schema({
        original: String,
        channel: String,
        width: Number,
        height: Number,
        uploaded: Date
    });

    var Channels = new Schema({
        name: String,
        pictures: [Pictures]
    });

    mongoose.model('Picture', Pictures);
    mongoose.model('Channel', Channels);
};
