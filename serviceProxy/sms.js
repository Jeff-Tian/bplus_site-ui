// 如何重用 HCD 的 sms.js? 发布成为 private node js package?

var http = require('http');
var sms = require('../config').sms;

module.exports = {
    getVerificationCode: function (req, res, next) {
        var options = {
            host: sms.host,
            port: sms.port,
            path: '/service' + req.path,
            method: req.method,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };

        var request = http.request(options, function (r) {
            r.pipe(res);
        });

        request.on('error', next);
        request.write(JSON.stringify({
            phone: req.body.mobile,
            code: sms.code
        }));
        request.end();
    }
};