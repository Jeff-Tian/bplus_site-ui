var http = require('http');
var config = require('../config');
var wechat = config.wechat;
var proxy = require('./proxy');

function proxyWechat(options) {
    options.host = wechat.host;
    options.port = wechat.port;
    options.dataMapper = function (d) {
        d.application_id = config.applicationId;
        d.app_id = wechat.app_id;
        // TODO: Delete it
        if (options.path === '/wechat/oauth/logon') {
            d.app_id = 'hcdglobal_corp';
        }
        d.href = 'https://jeff-tian.github.io/bridge-wechat/stylesheets/wechat.css';

        return d;
    };

    return proxy(options);
}

module.exports = {
    qrLogon: proxyWechat({
        path: '/wechat/qr/logon',
        method: 'POST'
    }),

    oAuthLogon: proxyWechat({
        path: '/wechat/oauth/logon',
        method: 'POST'
    }),

    bind: proxyWechat({
        path: '/wechat/qr/bind',
        method: 'POST'
    })
};