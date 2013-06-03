define(function(require, exports, module) {
    var rander = require('rander');

    var hash_cache = location.hash;

    var isHashChanged = function() {
        var new_hash = location.hash;
        if (hash_cache !== new_hash) {
            hash_cache = new_hash;
            return true;
        }
        return false;
    };

    exports.start = function() {
        // init page
        rander.paint(location.hash);
        
        if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
            window.onhashchange = function() {
                rander.paint(location.hash);
            };
        } else {
            setInterval(function() {
                if (isHashChanged()) {
                    rander.paint(location.hash);
                }
            }, 150);
        }
    };
});