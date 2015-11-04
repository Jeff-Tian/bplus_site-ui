var http = require('http');
var config = require('../config');
var wechat = config.wechat;
var proxy = require('./proxy');

function proxyWechat(options) {
    options.host = wechat.host;
    options.port = wechat.port;

    var dm = options.dataMapper;

    options.dataMapper = function (d, req) {
        d.application_id = config.applicationId;
        d.app_id = wechat.app_id;
        d.href = 'https://jeff-tian.github.io/bridge-wechat/stylesheets/wechat.css';

        return typeof dm === 'function' ? dm(d, req) : d;
    };

    return proxy(options);
}

module.exports = {
    qrLogon: proxyWechat({
        path: '/wechat/qr/logon',
        method: 'POST'
    }),

    /**
     * Typical Response:
     { isSuccess: true,
       result: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx271d071e2bd32a96&redirect_uri=http%3A%2F%2Fuat.hcdlearning.com%2Fwechat%2Flogon&response_type=code&scope=snsapi_userinfo&state=trd_we_act_144660664220539045682456344366&connect_redirect=1#wechat_redirect https%3A%2F%2Fjeff-tian.github.io%2Fbridge-wechat%2Fstylesheets%2Fwechat.css' }
     */
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
    }),

    getOpenId: proxyWechat({
        path: '/wechat/oauth/openid',
        method: 'POST',
        dataMapper: function (d, req) {
            // TODO: Use wechat.corp_app_id;
            //d.app_id = wechat.corp_app_id;
            d.app_id = 'hcdglobal_corp';
            d.returnUrl = req.query.returnUrl || req.body.returnUrl || req.headers['referer'] || (req.headers['origin'] + req.originalUrl);
            delete d.href;

            return d;
        },
        responseInterceptor: function (res, json, req) {
            if (json.isSuccess) {

                if (!req.xhr) {
                    res.redirect(json.result);
                } else {
                    res.json({
                        isSuccess: false,
                        code: '302',
                        message: json.result
                    });
                }

                return undefined;
            }

            return false;
        }
    })
};