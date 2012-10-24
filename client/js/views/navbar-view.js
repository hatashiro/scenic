var NavbarView = Backbone.View.extend({
    channel: null,
    initialize: function(channel) {
        if(channel) this.channel = channel;

        this.render(channel);
    },
    render: function(channel) {
        var nav_bar = ich.navbar_template({channel: channel});

        $('#Navbar').html(nav_bar);
    }
});
