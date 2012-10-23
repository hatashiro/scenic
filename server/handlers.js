var settings = require('../settings'),
    handlers = module.exports = {};

handlers.index = function(req, res) {
    res.render('index.jade', {settings: JSON.stringify(settings)});
}
