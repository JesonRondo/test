define(function(require, exports, module) {
    var User = require('user');
    var Public = require('public');

    var costlist = [10, 20, 30, 50, 100, 200, 300, 500, 1000, 3000, 5000, 10000, 20000];
    var banklist = [{'bankid': '8', 'name': '招商银行'},
                    {'bankid': '9', 'name': '工商银行'},
                    {'bankid': '11', 'name': '建设银行'},
                    {'bankid': '10', 'name': '农业银行'},
                    {'bankid': '53', 'name': '邮政储蓄'},
                    {'bankid': '13', 'name': '兴业银行'},
                    {'bankid': '6', 'name': '中信银行'},
                    {'bankid': '3', 'name': '中国银行'},
                    {'bankid': '12', 'name': '民生银行'},
                    {'bankid': '4', 'name': '交通银行'},
                    {'bankid': '7', 'name': '广发银行'},
                    {'bankid': '5', 'name': '光大银行'},
                    {'bankid': '2', 'name': '浦发银行'}];

    var createCostlist = function() {
        var $costlist = $('#costlist');
        var lis = [];
        for (var i = 0, len = costlist.length; i < len; i++) {
            lis.push('<li class="pay-list-li w20">');
            lis.push('<input type="radio" name="cost" class="pay-list-radio" id="cost-' + costlist[i] + '" data-cost="' + costlist[i] + '" />');
            lis.push('<label for="cost-' + costlist[i] + '" class="cost-a">' + costlist[i] + '元</label>');
            lis.push('</li>');
        }
        lis.push('<li class="pay-list-li w100">');
        lis.push('<input type="radio" name="cost" class="pay-list-radio" id="cost-custom" data-cost="10" />');
        lis.push('<label for="cost-custom" class="cost-a">其他</label>');
        lis.push('<input type="text" name="cost-custom-text" id="cost-custom-text" class="pay-list-text" value="10" />');
        lis.push('<label for="cost-custom-text" class="cost-a">元（请输入10至100000之间任意的整数）</label>');
        lis.push('</li>');

        lis = lis.join('');
        $costlist.html(lis);

        $costlist.find('.pay-list-radio').eq(0).click();
    };

    var createBanklist = function() {
        var $banklist = $('#banklist');

        var lis = [];
        for (var i = 0, len = banklist.length; i < len; i++) {
            lis.push('<li class="pay-list-li w25">');
            lis.push('<input type="radio" name="bank" class="pay-list-radio" id="bank-' + banklist[i].bankid + '" data-bankid="' + banklist[i].bankid + '" />');
            lis.push('<label for="bank-' + banklist[i].bankid + '" class="bank-icon bank-icon-' + banklist[i].bankid + '">' + banklist[i].name + '</label>');
            lis.push('</li>');
        }

        lis = lis.join('');
        $banklist.html(lis);

        $banklist.find('.pay-list-radio').eq(0).click();
    };

    var initPage = function() {
        createCostlist();
        createBanklist();
    };

    exports.init = function() {
        initPage();
        Public.reSet();

        Public.initSubmit();
    };
});