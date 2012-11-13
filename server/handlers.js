var settings = require('../settings'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

// mongoose models
var ChannelModel = mongoose.model('Channel'),
    PictureModel = mongoose.model('Picture');

function Handlers(web) {
    this.index = function(req, res) {
        res.render('index.jade', {});
    };

    this.channel = {
        get: function(req, res) {
            ChannelModel.find({name: req.params.name}, function(err, docs) {
                var channel = null;
                if(docs.length) {
                    channel = docs[0];
                }
                else {
                    // create new channel
                    channel = new ChannelModel({name: req.params.name, pictures: []});
                    channel.save();
                }
                res.json({id: channel.name, current_picture: 'temp_current_picture_id'}); // todo
            });
        },
        upload: function(req, res) {
            var image = req.files.picture_uploaded,
                upload_dir = path.join(__dirname, '../uploads'),
                channel = req.params.name;

            var response = function(text) {
                res.set('Content-Type', 'text/plain');
                res.send(text);
            };

            fs.readFile(image.path, function(err, data) {
                if(err) {
                    response('read_error:'+err);
                    return;
                }

                // create new picture
                picture = new PictureModel({channel: channel});

                var picture_dir = path.join(upload_dir, ''+picture._id);
                fs.mkdir(picture_dir, '0775', function(err) {
                    if(err) {
                        response('mkdir_error:'+err);
                        return;
                    }

                    var picture_file = path.join(picture_dir, image.name);
                    fs.writeFile(picture_file, data, function(err) {
                        if(err) {
                            response('write_error:'+err);
                            return;
                        }

                        // remove tmp file
                        fs.unlink(image.path, function(err) {
                            if(err) {
                                response('unlink_error:'+err);
                                return;
                            }

                            picture.original = picture_file;
                            picture.uploaded = Date.now();
                            picture.save(function(err) {
                                if(err) {
                                    response('save_error:'+err);
                                }

                                response('success');
                            });
                        });
                    });
                });
            });
        }
    };
}

module.exports = Handlers;
