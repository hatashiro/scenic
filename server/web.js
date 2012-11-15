var express = require('express'),
    path = require('path'),
    http = require('http'),
    handlers = require('./handlers'),
    settings = require('../settings');

function Web() {
    var app = this.app = express();
    this.server = http.createServer(app);
    this.socket = null;

    var route_handlers = new handlers(this);

    app.configure(function() {
        var basePath = path.join(__dirname, '..');
        app.use(express.bodyParser({uploadDir: path.join(basePath, './uploads')}));
        app.use(require('connect-assets')({build: false, src: path.join(basePath, 'client')}));
        app.use('/images', express['static'](path.join(basePath, 'client/images')));
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
            get: route_handlers.index
        },
        '/channel': {
            '/:name': {
                '/upload': {
                    post: route_handlers.channel.upload
                }
            }
        },
        '/picture': {
            '/:id': {
                get: route_handlers.picture.minified,
                '/original': {
                    get: route_handlers.picture.original
                },
                '/thumbnail': {
                    get: route_handlers.picture.thumbnail
                }
            }
        }
    });
}

Web.prototype.run = function() {
    this.server.listen(settings.port);
    console.log('Express now listening on port %s', settings.port);
};

module.exports = Web;
