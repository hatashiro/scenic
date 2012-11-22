var ShowPicturesView = Backbone.View.extend({
    channel: null,
    handler: null,
    object: null,
    initialize: function(channel, handler) {
        this.channel = channel;
        this.handler = handler;

        this.render();
    },
    render: function() {
        var _this = this;
        this.object = $(ich.show_pictures_template()).appendTo('body');
        this.object.data('view', this);
        this.object.click(function(e) {
            _this.object.remove();
            e.stopPropagation();
        });

        $.ajax('/channel/'+this.channel+'/pictures', {
            type: 'GET',
            dataType: 'json',
            success: function(picture_list) {
                _.each(picture_list, function(pid) {
                    var picture = $(ich.picture_thumbnail_template({pid: pid}));
                    picture.click(function(e) {
                        _this.handler(pid);
                        _this.remove();
                        e.stopPropagation();
                    });

                    $('ul.picture-list', _this.object).append(picture);
                });
            },
            error: function(err) {
                console.log('Error loading pictures:'+err);
                _this.remove();
            }
        });

        // resize handler
        var resize_handler = function() {
            _this.object.height($(window).height() - _this.object.position().top);
        };
        resize_handler();
        $(window).bind('resize.show_pictures', resize_handler);
    },
    remove: function() {
        this.object.remove();

        // remove resize handler
        $(window).unbind('resize.show_pictures');
    }
});
