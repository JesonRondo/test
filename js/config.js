seajs.config({
    plugins: ['shim', 'text'],
    shim: {
        'jquery': {
            src: 'lib/jquery.min.js',
            exports: 'jQuery'
        },
        'tinyscrollbar': {
            src: 'lib/jquery.tinyscrollbar.min.js',
            deps: ['jquery']
        },
        'ktip': {
            src: 'lib/jquery.ktip.min.js',
            deps: ['jquery']
        }
    },
    alias: {
        'router': 'ctrl/router.js',
        'rander': 'ctrl/rander.js',

        'public'  : 'page/public.js',
        'e_bank'  : 'page/bank.js',
        'e_mobile': 'page/mobile.js',
        'e_alipay': 'page/alipay.js',

        'data': 'com/data.js',
        'user': 'com/user.js',

        'util': 'lib/util.js'
    }
});