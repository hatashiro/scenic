var ChannelView = Backbone.View.extend({
    channel: null,
    statusbar: null,
    initialize: function(channel) {
        this.channel = channel;
    },
    render: function(pid, size) {
        var _this = this;

        if(pid && size) {
            this.loadPicture(pid, size);
        }
        else {
            this.renderEmptyChannel();
        }

        this.statusbar = $(ich.drag_and_drop_status_bar({})).appendTo('#content');

        // set drag-and-drop upload handler
        $('html').off('drop.picture_upload');
        $('html').off('dragover.picture_upload');
        $('html').off('dragleave.picture_upload');
        $('html').filedrop({
            namespace: 'picture_upload',
            url: '/channel/'+_this.channel+'/upload',
            paramname: 'picture_uploaded',
            allowedfiletypes: ['image/jpeg','image/png','image/gif'],
            maxfilesize: 100,
            dragOver: function() {
                _this.statusbar.css({bottom: 0});
            },
            dragLeave: function() {
                _this.statusbar.css({bottom: -1*_this.statusbar.height()});
            },
            drop: function() {
                // start loading
                _this.statusbar.addClass('uploading');
            },
            uploadFinished: function(i, file, response, time) {
                if(response !== 'success') {
                    alert('Internal Server Error:'+response);
                }

                // finish loading
                _this.statusbar.removeClass('uploading').css({bottom: -1*_this.statusbar.height()});
            },
            error: function(err, file) {
                switch(err) {
                    case 'BrowserNotSupported':
                        alert('Browser does not support html5 drag and drop');
                        break;
                    case 'FileTypeNotAllowed':
                        alert('Only jpg, jpeg, gif and png supported.');
                        break;
                    default:
                        alert(err);
                        break;
                }

                // finish loading
                _this.statusbar.removeClass('uploading').css({bottom: -1*_this.statusbar.height()});
            }
        });
    },
    loadPicture: function(pid, size) {
        var picture = ich.picture_template({pid: pid});

        $('#content').html(picture);

        // function to adjust picture height
        var adjustHeight = function() {
            var max_height = $(window).height() - $(picture).offset().top;
            $(picture).height(max_height);

            // set vertical align center
            if(max_height > size.height) {
                $(picture).css({paddingTop: parseInt((max_height - size.height)/2, 10)});
            }
        };
        adjustHeight();

        // set window.resize handler
        $(window).unbind('resize.picture');
        $(window).bind('resize.picture', function() {
            adjustHeight();
        });
    },
    renderEmptyChannel: function() {
        var empty_channel = ich.empty_channel_template({channel: this.channel});

        $('#content').html(empty_channel);
    }
});
