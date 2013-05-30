define(function(require, exports, module) {
    var getQueryString = function(param) {
        var isRetObj = false;
        var obj = {};
        if (param === undefined) {
            param = '';
            isRetObj = true;
        }

        if (location.href.indexOf('?') === -1 || location.href.indexOf(param + '=' ) === -1) {
            return isRetObj ? obj : '';
        }

        var queryString = location.href.substring(location.href.indexOf('?') + 1);
        if (queryString.indexOf('#') !== -1) {
            queryString = queryString.substring(0, queryString.indexOf('#'));
        }

        var parameters = queryString.split('&');

        var pos, paraName, paraValue;
        for (var i = 0, len = parameters.length; i < len; i++) {
            pos = parameters[i].indexOf('=');
            if (pos === -1) { continue; }

            paraName = parameters[i].substring(0, pos);
            paraValue = parameters[i].substring(pos + 1);

            if (isRetObj) {
                obj[paraName] = decodeURIComponent(paraValue.replace(/\+/g, ' '));
            } else {
                if (paraName === param) {
                    return decodeURIComponent(paraValue.replace(/\+/g, ' '));
                }
            }
        }

        return isRetObj ? obj : '';
    };

    exports.getQueryString = function(param) {  // param = undefined: return query obj
        return getQueryString(param);
    };
});