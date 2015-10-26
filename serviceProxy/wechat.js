var http = require('http');
var config = require('../config');
var wechat = config.wechat;
var proxy = require('./proxy');

function proxyWechat(options) {
    options.host = wechat.host;
    options.port = wechat.port;

    var dm = options.dataMapper;

    options.dataMapper = function (d) {
        d.application_id = config.applicationId;
        d.app_id = wechat.app_id;
        d.href = 'https://jeff-tian.github.io/bridge-wechat/stylesheets/wechat.css';

        return typeof dm === 'function' ? dm(d) : d;
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
        method: 'POST',
        dataMapper: function (d) {
            d.app_id = wechat.corp_app_id;

            return d;
        }
    }),

    bind: proxyWechat({
        path: '/wechat/qr/bind',
        method: 'POST'
    })
};