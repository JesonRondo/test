define(function(require, exports, module) {
	// load module
    var $ = require('jquery');
    var User = require('user');
    var Public = require('public');
    var Router = require('router');

    // load data
    User.init();

    // init public part
    Public.init();

    // start screen
    Router.start();
});