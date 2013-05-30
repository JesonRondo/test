define(function(require, exports, module) {
    var costlist = [10, 20, 30, 50, 100, 200, 300, 500];

    var createCostlist = function() {
        var $costlist = $('#costlist');
        var lis = [];
        for (var i = 0, len = costlist.length; i < len; i++) {
            lis.push('<li class="pay-list-li w20">');
            lis.push('<input type="radio" name="cost" class="pay-list-radio" id="cost-' + costlist[i] + '" />');
            lis.push('<label for="cost-' + costlist[i] + '">' + costlist[i] + '元</label>');
            lis.push('</li>');
        }

        lis = lis.join('');
        $costlist.html(lis);

        $costlist.find('.pay-list-radio').eq(0).click();
    };

    var initPage = function() {
        createCostlist();
    };

    exports.init = function() {
        initPage();
    };
});