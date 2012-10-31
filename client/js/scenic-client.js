//= require 'lib/jquery-1.8.2.min.js'
//= require 'lib/bootstrap.min.js'
//= require 'lib/underscore-min.js'
//= require 'lib/backbone-min.js'
//= require 'lib/ICanHaz.min.js'
//= require 'utils.js'
//= require 'handlers.js'
//= require 'router.js'
//= require 'models.js'
//= require 'socket.js'
//= require 'functions.js'
//= require_tree 'views'

$(function() {
    // create app view
    window.app_view = new AppView();

    // create app router
    var router = new Router();

    Backbone.history.start();
});
