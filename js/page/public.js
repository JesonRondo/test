define(function(require, exports, module) {
    var User = require('user');
    var Data = require('data');
    var userInfo = User.getUserInfo();

    var refreshCostTip = function() {
        var gid = $('#g-select-btn').attr('data-gid');

        if (gid === undefined || gid === '')
            return;

        var allgames = Data.getAllGames();

        var yuan = parseInt($('#costlist').find('.pay-list-radio:checked').attr('data-cost'), 10);

        try {
            
            var money_rate = parseInt(allgames[gid].money_rate, 10);

            var msg = '（' + yuan + '元人民币兑换' + yuan * money_rate + '《' + allgames[gid].name + '》元宝）';
            $('#pay_tip').html(msg);
        } catch(e) {
            
        }
    };

    var refreshHistoryGame = function() {
        var lis = [];
        var history = userInfo.playHistory;
        var count = 0;

        lis.push('<ul class="box-coverbox-list clearfix">');
        for (var k in history) {
            lis.push('<li class="w20"><a href="javascript:;" class="box-coverbox-list-a" data-id="' + history[k].webgame_id + '">' + history[k].webgame_name + '</a></li>');
            count++;
        }
        lis.push('</ul>');
        lis = lis.join('');

        if (count > 20) {
            var scroll_id = 'scrollbar' + Date.parse(new Date());

            var outer = [];
            outer.push('<div class="mscrollbar" id="' + scroll_id + '"><div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div><div class="bom"></div></div></div></div><div class="viewport"><div class="overview">');
            outer.push(lis);
            outer.push('</div></div></div>');
            lis = outer.join('');
            $('#gbox-history-subbox').html(lis);
            $('#gbox-history-sbtn').attr('data-scroll', scroll_id);
        } else {
            $('#gbox-history-subbox').html(lis);
        }
    };

    var refreshHistorySvr = function() {
        var history = userInfo.playHistory;
        var webgame_id = $('#g-select-btn').attr('data-gid');
        var count = 0;

        if (history[webgame_id] !== undefined) {
            var logined_svrs = history[webgame_id].logined_svrs;
            var lis = [];

            lis.push('<ul class="box-coverbox-list clearfix">');
            for (var k in logined_svrs) {
                lis.push('<li class="w25"><a href="javascript:;" class="box-coverbox-list-a" data-sid="' + logined_svrs[k].webgame_serverid + '">' + logined_svrs[k].servername + '(' + logined_svrs[k].webgame_serverid + '区)</a></li>');
                count++;
            }
            lis.push('</ul>');
            lis = lis.join('');

            if (count > 16) {
                var scroll_id = 'scrollbar' + Date.parse(new Date());

                var outer = [];
                outer.push('<div class="mscrollbar" id="' + scroll_id + '"><div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div><div class="bom"></div></div></div></div><div class="viewport"><div class="overview">');
                outer.push(lis);
                outer.push('</div></div></div>');
                lis = outer.join('');
                $('#sbox-history-subbox').html(lis);
                $('#sbox-history-sbtn').attr('data-scroll', scroll_id);
            } else {
                $('#sbox-history-subbox').html(lis);
            }
        } else { // none server
            $('#sbox-history-subbox').html('<p class="box-coverbox-p">没有最近玩过的服务器</p>');
        }
    };

    var refreshAllGames = function() {
        var lis = [];
        var allgames = Data.getAllGames();
        var count = 0;

        lis.push('<ul class="box-coverbox-list clearfix">');
        for (var k in allgames) {
            lis.push('<li class="w20"><a href="javascript:;" class="box-coverbox-list-a" data-id="' + allgames[k].webgame_id + '">' + allgames[k].name + '</a></li>');
            count++;
        }
        lis.push('</ul>');
        lis = lis.join('');

        if (count > 20) {
            var scroll_id = 'scrollbar' + Date.parse(new Date());

            var outer = [];
            outer.push('<div class="mscrollbar" id="' + scroll_id + '"><div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div><div class="bom"></div></div></div></div><div class="viewport"><div class="overview">');
            outer.push(lis);
            outer.push('</div></div></div>');
            lis = outer.join('');
            $('#gbox-allgames-subbox').html(lis);
            $('#gbox-allgames-sbtn').attr('data-scroll', scroll_id);
        } else {
            $('#gbox-allgames-subbox').html(lis);
        }
    };

    // rande all svrs with svrs array
    var randeAllSvrs = function(svrs) {
        var lis = [];
        var count = 0;

        lis.push('<ul class="box-coverbox-list clearfix">');
        for (var k in svrs) {
            lis.push('<li class="w25"><a href="javascript:;" class="box-coverbox-list-a" data-sid="' + svrs[k].id + '">' + svrs[k].name + '(' + svrs[k].id + '区)</a></li>');
            count++;
        }
        lis.push('</ul>');
        lis = lis.join('');

        if (count > 16) {
            var scroll_id = 'scrollbar' + Date.parse(new Date());

            var outer = [];
            outer.push('<div class="mscrollbar" id="' + scroll_id + '"><div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div><div class="bom"></div></div></div></div><div class="viewport"><div class="overview">');
            outer.push(lis);
            outer.push('</div></div></div>');
            lis = outer.join('');
            $('#sbox-allsvrs-subbox').html(lis);
            $('#sbox-allsvrs-sbtn').attr('data-scroll', scroll_id);
        } else {
            $('#sbox-allsvrs-subbox').html(lis);
        }


    };

    var refreshAllSvrs = function() {
        var webgame_id = $('#g-select-btn').attr('data-gid');
        var svrs = Data.getSvrs(webgame_id);

        if (svrs === undefined) {
            var url = '/index.php/webgame/getServerInfo/';
            var data = {
                'webgame_id': webgame_id
            };
            $.ajax({
                url: url,
                data: data,
                dataType: 'json',
                success: function(json) {
                    if (json.status === 1) {    // format
                        var svrs = json.data;
                        // refresh cache data
                        Data.setSvrs(webgame_id, svrs);
                        randeAllSvrs(svrs);
                    }
                }
            });
        } else {
            randeAllSvrs(svrs);
        }
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

                    refreshHistoryGame();
                }
            }
        });
    };

    var refreshGameSelectAll = function() {
        var url = 'index.php/webgame/getallgame/';
        var data = {
            'webgame_id': '0'
        };
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            success: function(json) {
                if (json.status === 1) {    // format
                    var data = json.data;
                    var allgames = {};
                    for (var k in data) {
                        var cur_obj = data[k];
                        allgames[cur_obj.webgame_id] = cur_obj;
                    }
                    // refresh cache data
                    Data.setAllGames(allgames);
                    refreshAllGames();
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

    var initSelectBtnEvent = function() {
        // game select btn
        $('#g-select-btn').on('click', function() {
            var $gcbox = $('#g-cbox');
            var $scbox = $('#s-cbox');

            if (!$gcbox.hasClass('box-coverbox-show')) {
                $scbox.removeClass('box-coverbox-show');
                $gcbox.addClass('box-coverbox-show');
            } else {
                $gcbox.removeClass('box-coverbox-show');
            }

            $('#gbox-tit').find('.box-coverbox-tit-a').each(function() {
                var $this = $(this);
                var s_id = $this.attr('data-scroll');
                if (s_id !== undefined && s_id !== '') {
                    require.async('tinyscrollbar', function() {
                        $('#' + s_id).tinyscrollbar();
                    });
                    $this.attr('data-scroll', '');
                }
            });

            var t = 0;
            $gcbox.on('mouseleave', function() {
                clearTimeout(t);
                var $this = $(this);
                t = setTimeout(function() {
                    $this.removeClass('box-coverbox-show');
                    $this.off('mouseleave');
                }, 200);
            }).on('mouseenter', function() {
                clearTimeout(t);
            });
        });

        // game slide title
        $('#gbox-tit').on('click', '.box-coverbox-tit-a', function() {
            var $this = $(this);
            if ($this.hasClass('box-coverbox-tit-a-select')) {
                return;
            } else {
                // switch tit
                $('#gbox-tit').find('.box-coverbox-tit-a-select')
                    .removeClass('box-coverbox-tit-a-select');
                $this.addClass('box-coverbox-tit-a-select');

                // switch main
                var $gbox_m = $('#gbox-main');
                if ($gbox_m.hasClass('box-covermain-slided')) {
                    $gbox_m.removeClass('box-covermain-slided');
                } else {
                    $gbox_m.addClass('box-covermain-slided');
                }
            }
        });

        // server select btn
        $('#s-select-btn').on('click', function() {
            var webgame_id = $('#g-select-btn').attr('data-gid');
            if (webgame_id === undefined || webgame_id === '') {
                require.async('ktip', function() {
                    $('#g-select-btn').ktip('请先选择需要充值的游戏', {
                        direction: 'left',
                        offset: 18,
                        atX: -5,
                        atY: 19,
                        closeBtn: false,
                        stick: 2000
                    });
                });
                return;
            }

            var $gcbox = $('#g-cbox');
            var $scbox = $('#s-cbox');

            if (!$scbox.hasClass('box-coverbox-show')) {
                $gcbox.removeClass('box-coverbox-show');
                $scbox.addClass('box-coverbox-show');
            } else {
                $scbox.removeClass('box-coverbox-show');
            }

            $('#sbox-tit').find('.box-coverbox-tit-a').each(function() {
                var $this = $(this);
                var s_id = $this.attr('data-scroll');
                if (s_id !== undefined && s_id !== '') {
                    require.async('tinyscrollbar', function() {
                        $('#' + s_id).tinyscrollbar();
                    });
                    $this.attr('data-scroll', '');
                }
            });

            var t = 0;
            $scbox.on('mouseleave', function() {
                clearTimeout(t);
                var $this = $(this);
                t = setTimeout(function() {
                    $this.removeClass('box-coverbox-show');
                    $this.off('mouseleave');
                }, 200);
            }).on('mouseenter', function() {
                clearTimeout(t);
            });
        });

        // server slide title
        $('#sbox-tit').on('click', '.box-coverbox-tit-a', function() {
            var $this = $(this);
            if ($this.hasClass('box-coverbox-tit-a-select')) {
                return;
            } else {
                // switch tit
                $('#sbox-tit').find('.box-coverbox-tit-a-select')
                    .removeClass('box-coverbox-tit-a-select');
                $this.addClass('box-coverbox-tit-a-select');

                // switch main
                var $sbox_m = $('#sbox-main');
                if ($sbox_m.hasClass('box-covermain-slided')) {
                    $sbox_m.removeClass('box-covermain-slided');
                } else {
                    $sbox_m.addClass('box-covermain-slided');
                }
            }
        });

        // game btn
        $('#gbox-main').on('click', '.box-coverbox-list-a', function() {
            var id = $(this).attr('data-id');
            var allgames = Data.getAllGames();

            try {
                var $g_select_btn = $('#g-select-btn');
                $g_select_btn.html(allgames[id].name);

                var gid = allgames[id].webgame_id;

                $g_select_btn.attr('data-gid', gid);
                $('#g-cbox').removeClass('box-coverbox-show');

                User.setUserInfo('g', gid);
                
                refreshHistorySvr();
                refreshAllSvrs();
                refreshCostTip();
            } catch(e) {
                
            }
        });

        // svr btn
        $('#sbox-main').on('click', '.box-coverbox-list-a', function() {
            var $this = $(this);

            var $s_select_btn = $('#s-select-btn');
            $s_select_btn.html($this.html());

            var sid = $this.attr('data-sid');

            $s_select_btn.attr('data-sid', sid);
            $('#s-cbox').removeClass('box-coverbox-show');

            User.setUserInfo('s', sid);
        });
    };

    var initPublicEvent = function() {
        $('#main').on('click', '#cost-custom', function() {
            $('#cost-custom-text').focus();
        });

        $('#main').on('click', '#cost-custom-text', function() {
            $('#cost-custom').click();
        }).on('keyup', function(e) {
            var $cost_custom_text = $('#cost-custom-text');
            var $cost_custom = $('#cost-custom');

            var custom = parseInt($cost_custom_text.val(), 10);
            var realcustom = $cost_custom.attr('data-cost');

            var code = e.keyCode;

            if (!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105)
             && code !== 46 && code !== 8
             && !(code >= 37 && code <= 40) && !(code >= 16 && code <= 18)) { // not number & del & back & arrow & shift ctrl alt
                $cost_custom_text.val(realcustom);
            } else {
                if (isNaN(custom)) {
                    $cost_custom.attr('data-cost', '0');
                    $cost_custom_text.val('0');
                } else if (custom > 999999) {
                    $cost_custom_text.val(realcustom);
                } else {
                    $cost_custom.attr('data-cost', custom);
                    refreshCostTip();
                }

            }
        });

        $('#main').on('click', '.pay-list-radio', function() {
            refreshCostTip();
        });
    };

    exports.init = function() {
        refreshGameSelect();
        refreshGameSelectAll();

        initNavEvent();
        initSelectBtnEvent();
        initPublicEvent();
    };

    exports.refreshCostTip = function() {
        refreshCostTip();
    };
});