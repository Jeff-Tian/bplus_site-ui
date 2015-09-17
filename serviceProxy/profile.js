var http = require('http');
var profile = require('../config').profile;
var proxy = require('./proxy');

module.exports = {
    getVerificationCode: proxy(sms.host, sms.port, '/service/sms/send', function (d) {
        return {
            phone: d.mobile,
            code: sms.code
        };
    }),

    validate: proxy({
        host: sms.host,
        port: sms.port,
        path: '/service/sms/validate',
        dataMapper: function (d) {
            return {
                phone: d.mobile,
                value: d.verificationCode
            };
        },
        responseInterceptor: function (resStream, json) {
            return json.isSuccess && json.result;
        }
    })
};