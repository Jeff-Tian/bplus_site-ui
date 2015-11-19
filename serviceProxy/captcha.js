var http = require('http');
var captcha = require('../config').captchaInternal;
var proxy = require('./proxy');

module.exports = {
    validate: proxy(
        {
            host: captcha.host,
            port: captcha.port,
            path: '/captcha/validate',
            dataMapper: function (d) {
                return {
                    id: d.captchaId,
                    value: d.captcha
                };
            },
            responseInterceptor: function (resStream, resJson, req) {
                req.dualLogError('captcha validation result: \r\n' + JSON.stringify(resJson) + '\r\npassed data:\r\n' + JSON.stringify(req.body));

                return false;
            }
        }
    )
};