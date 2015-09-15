// 如何重用 HCD 的 sms.js? 发布成为 private node js package?

var http = require('http');
var sms = require('../config').sms;
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