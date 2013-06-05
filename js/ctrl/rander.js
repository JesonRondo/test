define(function(require, exports, module) {
    var pages = {
        '#bank'  : {'tpl': '/pay/tpl/bank.html',   'e': 'e_bank'  ,'nav': 0},
        '#alipay': {'tpl': '/pay/tpl/alipay.html', 'e': 'e_alipay','nav': 1},
        '#mobile': {'tpl': '/pay/tpl/mobile.html', 'e': 'e_mobile','nav': 2}
    };

    var loadPage = function(tplPath, eventReg) {
        require.async(tplPath, function(tpl) {
            // load page
            $('#page').addClass('page-end');

            var _stepspeed = 150;
            var speed = ($('#page').length === 0) ? 0 : _stepspeed;
            setTimeout(function() {
                $('#main').html(tpl);
                if (speed === _stepspeed) {
                    $('#page').addClass('page-start');
                }
                // init event
                if (eventReg !== undefined) {
                    require.async(eventReg, function(e) {
                        e.init();
                    });
                }
            }, speed);
        });
    };
    
    var randerPage = function(hash) {
        if (hash === '') {
            location.hash = '#bank';
            return;
        }

        if (pages[hash] !== undefined) {
            $('#nav').find('.nav-li-a-select').removeClass('nav-li-a-select');
            $('#nav').find('.nav-li-a').eq(pages[hash].nav).addClass('nav-li-a-select');
            loadPage(pages[hash].tpl, pages[hash].e);
        }
    };

    exports.paint = function(hash) {
        randerPage(hash);
    };
});