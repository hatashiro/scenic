var settings = require('../settings'),
    mongoose = require('mongoose');

// mongoose models
var Channel = mongoose.model('Channel');
var Picture = mongoose.model('Picture');

function handlers(web) {
    this.index = function(req, res) {
        res.render('index.jade', {settings: JSON.stringify(settings)});
    }

    this.channel = {
        get: function(req, res) {
            Channel.find({name: req.params.name}, function(err, docs) {
                if(docs.length) {
                    var channel = docs[0];
                }
                else {
                    // create new channel
                    var channel = new Channel({name: req.params.name, pictures: []});
                    channel.save();
                }
                res.json({id: channel.name, current_picture: 'temp_current_picture_id'}); // todo
            });
        }
    }
}

module.exports = handlers;
