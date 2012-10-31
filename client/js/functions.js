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
