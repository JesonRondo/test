define(function(require, exports, module) {
    var Util = require('util');

    var userInfo = {
        uid: '243355955',
        pp: 'longzhou214',
        g: '',
        s: '',
        playHistory: {}
    };

    exports.init = function() {
        var qsobj = Util.getQueryString();

        userInfo['g'] = (qsobj['g'] !== undefined ? qsobj['g'] : '0');
        userInfo['s'] = (qsobj['s'] !== undefined ? qsobj['s'] : '0');
    };

    exports.getUserInfo = function() {
        return userInfo;
    };

    exports.setUserInfo = function(k, v) {
        userInfo[k] = v;
    };

    exports.setPlayHistory = function(obj) {
        userInfo.playHistory = obj;
    };
});