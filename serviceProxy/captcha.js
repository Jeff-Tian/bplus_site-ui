var http = require('http');
var captcha = require('../config').captcha;

module.exports = {
    validate: function (req, res, next) {
        var options = {
            host: captcha.host,
            port: captcha.port,
            path: '/captcha/validate',
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
            id: req.body.captchaId,
            value: req.body.captcha
        }));

        request.end();
    }
};