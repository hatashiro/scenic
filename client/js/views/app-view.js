var AppView = Backbone.View.extend({
    navbar_view: null,
    initialize: function() {
        this.render();
    },
    render: function() {
        // draw navbar view
        menu_view = new NavbarView();
    }
});
