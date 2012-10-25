var AppView = Backbone.View.extend({
    navbar_view: null,
    main_view: null,
    channel: null,
    initialize: function() {
        // nothing to do!
    },
    render: function(router) {
        if(router && router.channel) {
            this.channel = router.channel;
        }
        else {
            this.channel = null;
        }

        // draw navbar view
        if(!this.navbar_view) {
            this.navbar_view = new NavbarView(this.channel);
        }
        else {
            this.navbar_view.render(this.channel);
        }

        // draw main view
        if(router && router.page == 'channel') {
            this.main_view = new ChannelView(this.channel);
        }
        else {
            this.main_view = new IndexView();
        }
    }
});
