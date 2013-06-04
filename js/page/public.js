define(function(require, exports, module) {
    var User = require('user');
    var Data = require('data');
    var userInfo = User.getUserInfo();

    // tmp cache
    var roles = '';

    var refreshCostTip = function() {
        var gid = userInfo.g;

        if (gid === undefined || gid === '' || gid === '0')
            return;

        var allgames = Data.getAllGames();

        var yuan = parseInt($('#costlist').find('.pay-list-radio:checked').attr('data-cost'), 10);

        try {
            var money_rate = parseInt(allgames[gid].money_rate, 10);

            var msg = '（' + yuan + '元人民币兑换《' + allgames[gid].name + '》<span id="pay_tip_amount">' + yuan * money_rate + '元宝</span>）';
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
            var scroll_id = 'scrollbar' + Date.parse(new Date()) + parseInt(Math.random() * 10000, 10);

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
        var webgame_id = userInfo.g;
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
                var scroll_id = 'scrollbar' + Date.parse(new Date()) + parseInt(Math.random() * 10000, 10);

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
            var scroll_id = 'scrollbar' + Date.parse(new Date()) + parseInt(Math.random() * 10000, 10);

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
        var s_sid = userInfo.s; // auto select sid

        lis.push('<ul class="box-coverbox-list clearfix">');
        for (var k in svrs) {
            var cur_sid = svrs[k].id;

            lis.push('<li class="w25"><a href="javascript:;" class="box-coverbox-list-a" data-sid="' + cur_sid + '">' + svrs[k].name + '(' + cur_sid + '区)</a></li>');
            count++;

            if (s_sid === cur_sid) {
                var $s_select_btn = $('#s-select-btn');
                $s_select_btn.html(svrs[k].name);
                $s_select_btn.attr('data-sid', s_sid);
            }
        }
        lis.push('</ul>');
        lis = lis.join('');

        if (count > 16) {
            var scroll_id = 'scrollbar' + Date.parse(new Date()) + parseInt(Math.random() * 10000, 10);

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
        var webgame_id = userInfo.g;
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

                    initSidSelectBtn();

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

                    // auto select gid & sid
                    var $g_select_btn = $('#g-select-btn');
                    var gid = userInfo.g;
                    try {
                        if (allgames[gid] !== undefined) {
                            $g_select_btn.html(allgames[gid].name);
                            $g_select_btn.attr('data-gid', gid);
                        }
                    } catch(e) {

                    }

                    // refresh cache data
                    Data.setAllGames(allgames);
                    refreshAllGames();
                    refreshCostTip();
                }
            }
        });
    };

    var refreshSidSelectBtn = function() {
        $('#s-select-btn').attr('data-sid', '').html('选择游戏服务器');
        User.setUserInfo('s', '0');
        refreshHistorySvr();
        refreshAllSvrs();
        refreshCostTip();
    };

    var initSidSelectBtn = function() {
        refreshHistorySvr();
        refreshAllSvrs();
    };

    var initSelectBtnEvent = function() {
        // game select btn
        $('#g-select-btn').on('click', function(e) {
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

            e.preventDefault();
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
        $('#s-select-btn').on('click', function(e) {
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
                e.preventDefault();
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

            e.preventDefault();
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
                
                refreshSidSelectBtn();
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
    };

    var resetEvent = function() {
        $('#costlist').off('click').on('click', '.pay-list-radio', function() {
            refreshCostTip();
        });
    };

    var confirmBox = function(type) {
        var closeBox = function() {
            $('#dialog-mask').remove();
            $('#dialog').remove();
        };
        closeBox();

        var $box = [];

        // head
        $box.push('<div class="dialog-mask" id="dialog-mask"></div>');
        $box.push('<div class="dialog" id="dialog">');
        $box.push('<h5 class="dialog-tit">');
        $box.push('充值订单确认');
        $box.push('<a href="javascript:;" class="dialog-close closebtn">×</a>');
        $box.push('</h5>');
        $box.push('<div class="dialog-main clearfix">');
    
        // main
        switch(type) {
            case 'charge_info':
                $box.push('<dl class="dialog-main-sheet clearfix">');
                $box.push('<dt>充值帐号:</dt>');
                $box.push('<dd>' + $('#payform_passport_mainname').val() + '</dd>');
                $box.push('<dt>充值方式:</dt>');
                $box.push('<dd>' + $('#payform_platform_name').val() + '</dd>');
                $box.push('<dt>充值游戏:</dt>');
                $box.push('<dd>' + $('#payform_webgame_name').val() + ' ' + $('#payform_webgame_servername').val() + '</dd>');
                
                if (roles !== '') {
                    $box.push('<dt>角色名称:</dt>');
                    $box.push('<dd>' + roles + '</dd>');
                }
                
                $box.push('<dt>充值金额:</dt>');
                $box.push('<dd>' + $('#payform_pay_amount').val() + '元</dd>');
                $box.push('<dt>兑换游戏币:</dt>');
                $box.push('<dd>' + $('#pay_tip_amount').html() + '</dd>');
                $box.push('</dl>');
                break;
            case 'charge_ing':
                $box.push('<h5 class="dialog-main-tit">请在新打开的页面中完成充值支付！</h5>');
                $box.push('<p class="dialog-main-p1">付款前请不要关闭或刷新此页面。</p>');
                $box.push('<p class="dialog-main-p1">如果付款遇到问题，请联系<a href="javascript:;" class="orangelink" target="_blank">在线客服</a></p>');
                break;
            case 'empty_role':
                $box.push('<div class="dialog-main-err"></div>');
                $box.push('<p class="dialog-main-p2 red pt20">对不起!</p>');
                $box.push('<p class="dialog-main-p2">您尚未在该游戏服务器内创建角色</p>');
                $box.push('<p class="dialog-main-p2">不能进行充值！</p>');
                break;
        }

        // foot
        $box.push('</div>');
        $box.push('<div class="dialog-footer">');
        switch(type) {
            case 'charge_info':
                $box.push('<a href="javascript:;" class="dialog-btn dialog-btn-light ml45 submitbtn">确认提交</a>');
                $box.push('<a href="javascript:;" class="dialog-btn dialog-btn-dark ml20 closebtn">返回修改</a>');
                break;
            case 'charge_ing':
                $box.push('<a href="javascript:;" class="dialog-btn dialog-btn-light ml45">查看充值结果</a>');
                $box.push('<a href="javascript:;" class="dialog-btn dialog-btn-dark ml20 closebtn">返&nbsp;&nbsp;回</a>');
                break;
            case 'empty_role':
                $box.push('<a href="javascript:;" class="dialog-btn dialog-btn-light ml115 closebtn">返回修改</a>');
                break;
        }
        $box.push('</div>');

        $('body').append($box.join(''));

        // event
        $('#dialog').on('click', '.submitbtn', function() {
            confirmBox('charge_ing');
            $('#payform').submit();
        });
        $('#dialog').on('click', '.closebtn', function() {
            closeBox();
        });
    };

    exports.initSubmit = function() {
        $('#paybtn').on('click', function(e) {
            var userinfo = User.getUserInfo();

            $('#payform_passport_mainname').val(userinfo.pp);

            // gid
            if (userinfo.g === '0') {
                require.async('ktip', function() {
                    $('#g-select-btn').ktip('请选择需要充值的游戏', {
                        direction: 'top',
                        offset: 75,
                        atX: 100,
                        atY: 36,
                        closeBtn: false,
                        stick: 2000
                    });
                });
                e.preventDefault();
                return;
            }
            $('#payform_webgame_id').val(userinfo.g);
            $('#payform_webgame_name').val($('#g-select-btn').html());

            // sid
            if (userinfo.s === '0') {
                require.async('ktip', function() {
                    $('#s-select-btn').ktip('请选择游戏服务器', {
                        direction: 'top',
                        offset: 65,
                        atX: 100,
                        atY: 36,
                        closeBtn: false,
                        stick: 2000
                    });
                });
                e.preventDefault();
                return;
            }
            $('#payform_webgame_serverid').val(userinfo.s);
            $('#payform_webgame_servername').val($('#s-select-btn').html());

            // amount
            var amount = parseInt($('#costlist').find('.pay-list-radio:checked').attr('data-cost'), 10);
            if (isNaN(amount) || amount < 10 || amount > 100000) {
                require.async('ktip', function() {
                    $('#cost-custom-text').ktip('请输入10至100000之间任意的整数', {
                        direction: 'left',
                        offset: 17,
                        atX: -3,
                        atY: 10,
                        closeBtn: false,
                        stick: 2000
                    });
                });
                e.preventDefault();
                return;
            }
            $('#payform_pay_amount').val(amount);

            // bank
            var $banklist = $('#banklist');
            if ($banklist.length !== 0) {
                var bank = $banklist.find('.pay-list-radio:checked').attr('data-bankid');
                $('#payform_platform_sub_id').val(bank);
            }

            // ckeck player
            // var url = '/index.php/webgame/getRole/';
            var url = '/role.json';
            var data = {
                'uid': userinfo.uid,
                'pp': userinfo.pp,
                'webgame_id': userinfo.g,
                'webgame_serverid': userinfo.s
            };
            $.ajax({
                url: url,
                data: data,
                dataType: 'json',
                success: function(json) {
                    if (json.status === 1) {
                        var roles_data = json.data;
                        var roles_num = roles_data.length;

                        if (roles_num > 3) roles_num = 3;

                        roles = [];
                        for (var i = 0; i < roles_num; i++) {
                            roles.push(roles_data[i]);
                        }
                        roles = roles.join(', ');
                        confirmBox('charge_info');
                    } else {
                        confirmBox('empty_role');
                    }
                }
            });

            e.preventDefault();
        });
    };

    exports.init = function() {
        refreshGameSelect();
        refreshGameSelectAll();

        initSelectBtnEvent();
        initPublicEvent();
    };

    exports.reSet = function() {
        refreshCostTip();
        resetEvent();
    };
});