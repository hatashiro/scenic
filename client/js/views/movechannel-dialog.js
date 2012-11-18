var MoveChannelDialogView = Backbone.View.extend({
    object: null,
    initialize: function() {
        // delete dialog if exists
        if(window._bootstrap_dialog) {
            window._bootstrap_dialog.remove();
        }
        window._bootstrap_dialog = this;

        this.render();
    },
    render: function() {
        var _this = this;
        this.object = $(ich.move_channel_template({}));
        this.object.appendTo('body');

        // set modal
        this.object.modal({backdrop: 'static', keyboard: false});

        // set handlers
        $('button.move-channel', this.object).click(function(e) {
            var channel = $("input.channel", _this.object).val();

            if(channel[0] == '#') {
                channel = channel.substring(1);
            }

            if(!channel) return;

            // check alphanumerics
            var alphanumerics = /^[A-Za-z0-9_]+$/;
            if(!channel.match(alphanumerics)) {
                if(!$('.modal-body .alert.no-whitespace').length) {
                    var alert_div = $("<div class='alert alert-error no-whitespace'>Only allow alphanumerics and underscore.</div>");
                    alert_div.append('<button type="button" class="close" data-dismiss="alert">×</button>');
                    $('.modal-body', _this.object).append(alert_div);
                }
                return;
            }

            // move channel
            location.href = '/#'+channel;
            _this.hide();
        });
        this.object.on('hidden', function() {
            _this.object.remove();
        });
        this.object.on('shown', function() {
            // set focus
            $('input.channel', _this.object).focus();
        });
        $("input.channel", this.object).keyup(function(e) {
            if(e.which == 13) {
                // enter
                $('button.move-channel', _this.object).click();
            }
        });

        $("input.channel", this.object).keydown(function(e) {
            // prevent propagation to body(keydown.chat)
            e.stopPropagation();
        });
    },
    remove: function() {
        this.object.remove();
        $('.modal-backdrop').remove();
    },
    hide: function() {
        this.object.modal('hide');
    }
});
