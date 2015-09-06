var sms = require('./sms'),
    captcha = require('./captcha');

module.exports = require('express').Router()
    .get('/', function (req, res, next) {
        res.send('Hello from service proxy');
    })
    .post('/sms/send', captcha.validate, sms.getVerificationCode)
;