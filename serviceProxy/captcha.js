var http = require('http');
var captcha = require('../config').captcha;
var proxy = require('./proxy');

module.exports = {
    validate: proxy(captcha.host, captcha.port, '/captcha/validate', function (d) {
        return {
            id: d.captchaId,
            value: d.captcha
        };
    })
};