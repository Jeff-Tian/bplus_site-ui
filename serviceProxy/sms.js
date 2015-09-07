// 如何重用 HCD 的 sms.js? 发布成为 private node js package?

var http = require('http');
var sms = require('../config').sms;
var proxy = require('./proxy');

module.exports = {
    getVerificationCode: proxy(sms.host, sms.port, '/service/sms/send', function (d) {
        return {
            phone: d.mobile,
            code: d.code
        };
    }),

    validate: proxy(sms.host, sms.port, '/service/sms/validate', function (d) {
        return {
            phone: d.mobile,
            value: d.verificationCode
        };
    })
};