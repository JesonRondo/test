seajs.config({
    plugins: ['shim', 'text'],
    shim: {
        'jquery': {
            src: 'lib/jquery.min.js',
            exports: 'jQuery'
        }
    },
    alias: {
        'router': 'ctrl/router.js',
        'rander': 'ctrl/rander.js',

        'public'  : 'page/public.js',
        'e_bank'  : 'page/bank.event.js',
        'e_mobile' : 'page/mobile.event.js',
        'e_alipay': 'page/alipay.event.js',

        'data': 'com/data.js',
        'user': 'com/user.js',

        'util': 'lib/util.js'
    }
});