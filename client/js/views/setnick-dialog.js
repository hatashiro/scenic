var SetNickDialogView = Backbone.View.extend({
    object: null,
    handler: null,
    initialize: function(handler) {
        this.handler = _.once(handler);

        // delete dialog if exists
        (window._bootstrap_dialog && window._bootstrap_dialog.remove());
        window._bootstrap_dialog = this;

        this.render();
    },
    render: function() {
        var _this = this;
        this.object = $(ich.set_nick_template({}));
        this.object.appendTo('body');

        // set modal
        this.object.modal({backdrop: 'static', keyboard: false});

        // set handlers
        $('button.set-nick', this.object).click(function(e) {
            var nick = $("input.nickname", _this.object).val();

            if(!nick) return;

            if(/\s/g.test(nick)) {
                if(!$('.modal-body .alert.no-whitespace').length) {
                    var alert_div = $("<div class='alert alert-error no-whitespace'>No whitespace allowed in nickname.</div>");
                    alert_div.append('<button type="button" class="close" data-dismiss="alert">×</button>');
                    $('.modal-body', _this.object).append(alert_div);
                }
                return;
            }

            _this.handler(nick);
            _this.hide();
        });
        this.object.on('hidden', function() {
            _this.object.remove();
        });
        $("input.nickname", this.object).keyup(function(e) {
            if(e.which == 13) {
                // enter
                $('button.set-nick').click();
            }

            // prevent propagation to body(keyup.chat)
            e.stopPropagation();
        });

        // set focus
        $('input.nickname', this.object).focus();
    },
    remove: function() {
        this.object.remove();
        $('.modal-backdrop').remove();
    },
    hide: function() {
        this.object.modal('hide');
    },
});
