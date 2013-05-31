define(function(require, exports, module) {
	var games = {};

	var svrs = {};

    exports.getAllGames = function() {
        return games;
    };

    exports.setAllGames = function(obj) {
        games = obj;
    };

    exports.getSvrs = function(id) {
        return svrs[id];
    };

    exports.setSvrs = function(id, obj) {
        svrs[id] = obj;
    };
});