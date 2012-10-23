var express = require('express'),
    path = require('path'),
    handlers = require('./handlers'),
    settings = require('../settings');

function web() {
    var web = this;
    var app = web.server = express();

    app.configure(function() {
        var basePath = path.join(__dirname, '..');
        app.use(require('connect-assets')({build: false, src: path.join(basePath, 'client')}));
        app.use('/images', express.static(path.join(basePath, 'client/images')));
        app.set('views', path.join(basePath, 'views'));
    });

    // route map
    app.map = function(a, route){
        route = route || '';
        for (var key in a) {
            switch (typeof a[key]) {
                // { '/path': { ... }}
                case 'object':
                    app.map(a[key], route + key);
                    break;
                // get: function(){ ... }
                case 'function':
                    app[key](route, a[key]);
                    break;
            }
        }
    };

    app.map({
        '/': {
            get: handlers.index,
        }
    });
}

web.prototype.run = function() {
    this.server.listen(settings.port);
    console.log('Express now listening on port %s', settings.port);
}

module.exports = web;
