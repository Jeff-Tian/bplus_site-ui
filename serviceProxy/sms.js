var http = require('http');
var sms = require('../config').sms;
var proxy = require('./proxy');

module.exports = {
    getVerificationCode: function (req, res, next) {
        proxy(sms.host, sms.port, '/service/sms/send', function (d) {
            return {
                phone: d.mobile,
                code: sms.code
            };
        })(req, res, next);
    },

    validate: function (req, res, next) {
        proxy({
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
        })(req, res, next);
    }
};