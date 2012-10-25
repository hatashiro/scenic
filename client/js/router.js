var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        ':channel': 'channel'
    },
    index: function() {
        window.app_view.render({page: 'index'});
    },
    channel: function(channel) {
        window.app_view.render({page: 'channel', channel: channel});
    }
});
