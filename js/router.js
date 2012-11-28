var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        ':channel': 'channel'
    },
    index: handlers.index,
    channel: handlers.channel
});
