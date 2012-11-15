var settings = require('../settings'),
    path = require('path'),
    fs = require('fs'),
    gm = require('gm'),
    mongoose = require('mongoose');

// mongoose models
var ChannelModel = mongoose.model('Channel'),
    PictureModel = mongoose.model('Picture');

function Handlers(web) {
    this.index = function(req, res) {
        res.render('index.jade', {});
    };

    this.channel = {
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
                var picture = new PictureModel({channel: channel}),
                    picture_dir = path.join(upload_dir, ''+picture._id);

                fs.mkdir(picture_dir, '0775', function(err) {
                    if(err) {
                        response('mkdir_error:'+err);
                        return;
                    }

                    var ext = path.extname(image.name.toLowerCase()),
                        original = path.join(picture_dir, "original"+ext);

                    fs.writeFile(original, data, function(err) {
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

                            picture.original = original;

                            var createThumbnailAndMinified = function() {
                                // get size
                                gm(original).size(function(err, size) {
                                    // create thumbnail
                                    var thumbnail_width = size.width >= size.height ? 300 : size.width * 300 / size.height,
                                        thumbnail_height = size.width <= size.height ? 300 : size.height * 300 / size.width,
                                        thumbnail = path.join(picture_dir, "thumbnail.jpg");

                                    gm(original).resize(thumbnail_width, thumbnail_height).quality(90).write(thumbnail, function(err) {
                                        if(err) {
                                            response('thumbnail_error:'+err);
                                            return;
                                        }

                                        picture.thumbnail = thumbnail;

                                        var save = function() {
                                            picture.upload = Date.now();
                                            picture.save(function(err) {
                                                if(err) {
                                                    response('save_err:'+err);
                                                    return;
                                                }

                                                if(ext === '.gif') {
                                                    // remove temp jpg file
                                                    fs.unlink(original, function(err) {
                                                        response('success');
                                                    });
                                                }
                                                else {
                                                    response('success');
                                                }

                                                // set as current picture of channel
                                                web.socket.changePicture(channel, picture._id);
                                            });
                                        };

                                        // if the image is larger than 1mb or 1920x1080, create minified image.
                                        if((image.size > 1024 * 1024 || size.width > 1920 || size.height > 1080) && ext !== '.gif') {
                                            var minified_width = (size.width / size.height) >= (16 / 9) ? 1920 : 1080 * size.width / size.height,
                                                minified_height = (size.width / size.height) <= (16 / 9) ? 1080 : 1920 * size.height / size.width,
                                                minified = path.join(picture_dir, "minified.jpg");

                                            gm(original).resize(minified_width, minified_height).quality(90).write(minified, function(err) {
                                                if(err) {
                                                    response('minified_error:'+err);
                                                    return;
                                                }

                                                picture.minified = minified;
                                                save();
                                            });
                                        }
                                        else {
                                            save();
                                        }
                                    });
                                });
                            };

                            if(ext !== '.gif') {
                                createThumbnailAndMinified();
                            }
                            else {
                                var gif = original;
                                original = 'temp.jpg';
                                gm(gif).write(original, function(err) {
                                    if(err) {
                                        response('gif_convert_error:'+err);
                                        return;
                                    }
                                    createThumbnailAndMinified();
                                });
                            }
                        });
                    });
                });
            });
        }
    };

    this.picture = {
        minified: function(req, res) {
            var pid = req.params.id;
            PictureModel.findOne({_id: pid}, function(err, picture) {
                if(err) {
                    res.send('Error in finding picture...:'+err);
                    return;
                }

                var minified = picture.minified ? picture.minified : picture.original;
                res.sendfile(minified);
            });
        },
        original: function(req, res) {
            var pid = req.params.id;
            PictureModel.findOne({_id: pid}, function(err, picture) {
                if(err) {
                    res.send('Error in finding picture...:'+err);
                    return;
                }

                res.sendfile(picture.original);
            });
        },
        thumbnail: function(req, res) {
            var pid = req.params.id;
            PictureModel.findOne({_id: pid}, function(err, picture) {
                if(err) {
                    res.send('Error in finding picture...:'+err);
                    return;
                }

                res.sendfile(picture.thumbnail);
            });
        }
    };
}

module.exports = Handlers;
