var NavbarView = Backbone.View.extend({
    channel: null,
    object: null,
    initialize: function(channel) {
        if(channel) this.channel = channel;

        this.render(channel);
    },
    render: function(channel) {
        this.object = $(ich.navbar_template({channel: channel}));

        $('#Navbar').html(this.object);
    },
    setNick: function(nick) {
        if(!this.object) return;

        $('span.nick', this.object).text(nick);
    },
    setChangeNickHandler: function(handler) {
        $('a.change-nick', this.object).click(handler);
    }
});
