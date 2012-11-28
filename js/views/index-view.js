var IndexView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        var index_content = ich.index_template();

        $('#content').html(index_content);
    }
});
