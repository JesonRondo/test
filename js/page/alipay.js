define(function(require, exports, module) {
    var Public = require('public');

    var costlist = [10, 20, 30, 50, 100, 200, 300, 500, 1000, 3000, 5000, 10000, 20000];

    var createCostlist = function() {
        var $costlist = $('#costlist');
        var lis = [];
        for (var i = 0, len = costlist.length; i < len; i++) {
            lis.push('<li class="pay-list-li w20">');
            lis.push('<input type="radio" name="cost" class="pay-list-radio" id="cost-' + costlist[i] + '" data-cost="' + costlist[i] + '" />');
            lis.push('<label for="cost-' + costlist[i] + '">' + costlist[i] + '元</label>');
            lis.push('</li>');
        }
        lis.push('<li class="pay-list-li w100">');
        lis.push('<input type="radio" name="cost" class="pay-list-radio" id="cost-custom" data-cost="10" />');
        lis.push('<label for="cost-custom">其他</label>');
        lis.push('<input type="text" name="cost-custom-text" id="cost-custom-text" class="pay-list-text" value="10" />');
        lis.push('<label for="cost-custom-text">元（请输入10至100000之间任意的整数）</label>');
        lis.push('</li>');

        lis = lis.join('');
        $costlist.html(lis);

        $costlist.find('.pay-list-radio').eq(0).click();
    };

    var initPage = function() {
        createCostlist();
    };

    exports.init = function() {
        initPage();
        Public.refreshCostTip();
    };
});