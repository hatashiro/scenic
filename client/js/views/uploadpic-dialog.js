var UploadPicDialogView = Backbone.View.extend({
    object: null,
    channel: null,
    initialize: function(channel) {
        this.channel = channel;

        // delete dialog if exists
        if(window._bootstrap_dialog) {
            window._bootstrap_dialog.remove();
        }
        window._bootstrap_dialog = this;

        this.render();
    },
    render: function() {
        var _this = this;
        this.object = $(ich.upload_pic_template({'channel': this.channel}));
        this.object.appendTo('body');

        // set modal
        this.object.modal({backdrop: 'static', keyboard: false});

        // set handlers
        $('button.upload-pic', this.object).click(function(e) {
            var form = $('#uploadPictureForm'),
                file = $("input[name='picture_uploaded']", form),
                button = $(this),
                iframe = $("<iframe id='fileuploadIframe'></iframe>");

            if(button.hasClass('disabled')) {
                return;
            }

            if(!file.val()) {
                return;
            }


            if(!hasProperImageExt(file.val())) {
                if(!$('.modal-body .alert.wrong-image-ext').length) {
                    var alert_div = $("<div class='alert alert-error wrong-image-ext'>Only jpg, jpeg, gif and png supported.</div>");
                    alert_div.append('<button type="button" class="close" data-dismiss="alert">×</button>');
                    $('.modal-body', _this.object).append(alert_div);
                }
                return;
            }

            // set iframe
            iframe.appendTo(form.parent());
            iframe.load(function(e) {
                var result = iframe.contents().text();
                if(result === 'success') {
                    _this.hide();
                }
                else {
                    var alert_div = $("<div class='alert alert-error server-error'>Sorry! Something is broken in the server :(</div>");
                    alert_div.append('<button type="button" class="close" data-dismiss="alert">×</button>');
                    $('.modal-body', _this.object).append(alert_div);

                    // enable input
                    file.removeAttr('disabled');
                    button.text('Upload').removeClass('loading disabled');
                }
                iframe.remove();
            });

            // disable input
            file.attr('disabled', 'disabled');
            button.text('Uploading...').addClass('loading disabled');

            // submit the file
            form.submit();
        });
        this.object.on('hidden', function() {
            _this.object.remove();
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
