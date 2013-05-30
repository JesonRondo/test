define(function(require, exports, module) {
    var User = require('user');
    var userInfo = User.getUserInfo();

    var randeGameSelect = function() {
        var lis = [];
        var history = userInfo.playHistory;
        for (var k in history) {
            lis.push('<li>' + history[k].webgame_name + '</li>');
        }
        lis.join('');

        $('#game_played_select').html(lis);
    };

    var refreshGameSelect = function() {
        var url = '/index.php/webgame/getPlayHistory/';
        var data = {
            'uid': userInfo.uid,
            'pp': userInfo.pp
        };
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            success: function(json) {
                if (json.status === 1) {    // format
                    var data = json.data;
                    var history = {};
                    for (var k in data) {
                        var cur_obj = data[k];
                        if (history[cur_obj.webgame_id] === undefined) {
                            history[cur_obj.webgame_id] = {};
                        }
                        var game_obj = history[cur_obj.webgame_id];

                        game_obj['webgame_id'] = cur_obj.webgame_id;
                        game_obj['webgame_name'] = cur_obj.webgame_name;
                        if (game_obj['logined_svrs'] === undefined) {
                            game_obj['logined_svrs'] = [];
                        }

                        var svr_obj = {};
                        svr_obj['webgame_serverid'] = cur_obj.webgame_serverid;
                        svr_obj['serverid_alias'] = cur_obj.serverid_alias;
                        svr_obj['servername'] = cur_obj.servername;

                        game_obj['logined_svrs'].push(svr_obj);
                    }
                    // refresh cache data
                    User.setPlayHistory(history);
                    userInfo = User.getUserInfo();

                    randeGameSelect();
                }
            }
        });
    };

    var initNavEvent = function() {
        $('#nav').on('click', '.nav-li-a', function() {
            var $this = $(this);
            if ($this.hasClass('nav-li-a-select'))
                return;

            $('#nav').find('.nav-li-a-select').removeClass('nav-li-a-select');
            $this.addClass('nav-li-a-select');
        });
    };

    exports.init = function() {
        refreshGameSelect();
        initNavEvent();
    };
});