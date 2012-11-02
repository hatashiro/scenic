var Channel = Backbone.Model.extend({
    defaults: {
        id: '',
        current_picture: ''
    },
    urlRoot: '/channel'
});
