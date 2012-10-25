var ChannelView = Backbone.View.extend({
    channel: null,
    initialize: function(channel) {
        this.channel = channel;

        this.render(channel);
    },
    render: function(channel) {
        var channel_content = ich.channel_template({channel: channel});

        $('#content').html(channel_content);
    }
});
