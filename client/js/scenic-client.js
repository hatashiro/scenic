//= require 'lib/jquery-1.8.2.min.js'
//= require 'lib/bootstrap.min.js'
//= require 'lib/underscore-min.js'
//= require 'lib/backbone-min.js'
//= require 'lib/ICanHaz.min.js'
//= require 'router.js'
//= require_tree 'views'

$(function() {
    // create app view
    window.app_view = new AppView();

    // create app router
    var router = new Router();

    Backbone.history.start();
});

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
