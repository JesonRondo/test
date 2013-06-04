define(function(require, exports, module) {
    var Util = require('util');

    var userInfo = {
        uid: '',
        pp: '',
        g: '',
        s: '',
        playHistory: {}
    };

    exports.init = function() {
        var qsobj = Util.getQueryString();

        // var url = '/index.php/api/userInfoByUtk/';
        var url = '/user.json';
        var data = null;
        $.ajax({
            url: url,
            data: data,
            async: false,
            type: 'GET',
            dataType: 'json',
            success: function(json) {
                if (json.code === 1) {    // format
                    var data = json.data;
                    userInfo['uid'] = data.uid;
                    userInfo['pp'] = data.passport;
                }
            }
        });

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