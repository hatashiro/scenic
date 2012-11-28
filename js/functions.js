function join_channel() {
    var channel_name = $('#channel_name').val();

    if(channel_name[0] == '#') {
        channel_name = channel_name.substring(1);
    }

    if(!channel_name) {
        return false;
    }

    // check alphanumerics
    var alphanumerics = /^[A-Za-z0-9_]+$/;
    if(!channel_name.match(alphanumerics)) {
        alert('Sorry! A channel name can only contains alphanumerics and underscore.');
        return false;
    }

    location.href = '#' + channel_name;

    return false;
}

function toggle_chat(button) {
    if(window.chat_view) {
        if(window.chat_view.isHidden()) {
            window.chat_view.show();
            $('#ChatButton').addClass('on');
            $('#ChatButton').removeClass('off');
        }
        else {
            window.chat_view.hide();
            $('#ChatButton').addClass('off');
            $('#ChatButton').removeClass('on');
        }
    }
}

function hasProperImageExt(filename) {
    var allowedExtList = ['.jpg', '.jpeg', '.png', '.gif'];

    for(var i in allowedExtList) {
        var ext = allowedExtList[i];
        if(filename.toLowerCase().endswith(ext)) {
            return true;
        }
    }
    return false;
}
