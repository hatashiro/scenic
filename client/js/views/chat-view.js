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
    },
});
