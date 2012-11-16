var ChannelView = Backbone.View.extend({
    channel: null,
    initialize: function(channel) {
        this.channel = channel;

        this.render(channel);
    },
    render: function(channel) {
        var channel_content = ich.channel_template({channel: channel});

        $('#content').html(channel_content);
    },
    loadPicture: function(pid, width, height) {
        var picture = ich.picture_template({pid: pid});

        $('#content').html(picture);

        // function to adjust picture height
        var adjustHeight = function() {
            var max_height = $(window).height() - $(picture).offset().top;
            $(picture).height(max_height);

            // set vertical align center
            if(max_height > height) {
                $(picture).css({paddingTop: parseInt((max_height - height)/2)});
            }
        };
        adjustHeight();

        // set window.resize handler
        $(window).unbind('resize.picture');
        $(window).bind('resize.picture', function() {
            adjustHeight();
        });
    }
});
