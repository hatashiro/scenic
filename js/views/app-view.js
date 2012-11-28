var AppView = Backbone.View.extend({
    navbar_view: null,
    main_view: null,
    channel: null,
    initialize: function() {
        // nothing to do!
    },
    render: function(router) {
        // remove picture resize handler
        $(window).unbind('resize.picture');

        // remove drag-and-drop upload handler
        $('html').off('drop.picture_upload');
        $('html').off('dragover.picture_upload');
        $('html').off('dragleave.picture_upload');

        // delete dialog if exists
        if(window._bootstrap_dialog) {
            window._bootstrap_dialog.remove();
        }

        // delete show-picture view if exists
        if($('#ShowPictures').length) {
            $('#ShowPictures').data('view').remove();
        }

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
