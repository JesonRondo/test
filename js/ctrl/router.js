define(function(require, exports, module) {
    var rander = require('rander');

    exports.start = function() {
        // init page
        rander.paint(location.hash);
        
        window.onhashchange = function() {
            rander.paint(location.hash);
        };
    };
});