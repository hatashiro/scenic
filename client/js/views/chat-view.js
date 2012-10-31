var ChatView = Backbone.View.extend({
    object: null,
    initialize: function() {
        this.render();
    },
    render: function() {
        var _this = this; // for handlers
        var chat = ich.chat_template({});
        this.object = $(chat);

        // set chat handlers
        this.object.click(function(e) {
            _this.openInputBox();
        });

        $("input.chat-input", this.object).blur(function(e) {
            $(".input-box", _this.object).hide();
        });

        $('body').append(this.object);

        // open input box
        this.openInputBox();

        // handle 'enter' and 'esc' key for show or hide chat view.
        $(document).bind('keyup.chat', function(e) {
            if(e.which == 13) {
                // enter
                if(_this.isHidden()) {
                    _this.show();

                    // update button text
                    $('#ChatButton').addClass('on');
                    $('#ChatButton').removeClass('off');
                }
                else {
                    _this.openInputBox();
                }
            }
            else if(e.which == 27) {
                // esc
                if(!_this.isHidden()) {
                    _this.hide();

                    // update button text
                    $('#ChatButton').addClass('off');
                    $('#ChatButton').removeClass('on');
                }
            }
        });
    },
    openInputBox: function() {
        if(this.object) {
            $(".input-box", this.object).show();
            $("input.chat-input", this.object).focus();
        }
    },
    show: function() {
        if(this.object) {
            this.object.removeClass('hidden');
            this.openInputBox();
        }
    },
    hide: function() {
        if(this.object) {
            this.object.addClass('hidden');
        }
    },
    isHidden: function() {
        if(this.object) {
            return this.object.hasClass('hidden');
        }
        else {
            return false;
        }
    },
    remove: function() {
        if(this.object) {
            this.object.remove();
        }

        // unbind document handler
        $(document).unbind('keyup.chat');
    },
});
