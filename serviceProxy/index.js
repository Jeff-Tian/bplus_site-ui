var sms = require('./sms'),
    captcha = require('./captcha'),
    sso = require('./sso'),
    mail = require('./mail'),
    membership = require('./membership')
    ;

module.exports = require('express').Router()
    .get('/', function (req, res, next) {
        res.send('Hello from service proxy');
    })
    .post('/sms/send', captcha.validate, sms.getVerificationCode)
    .post('/member/register', sms.validate, sso.signUp)
    .post('/member/change-mobile', sms.validate, sso.authenticateCurrentUser, sso.changeMobile)
    .post('/member/change-email', sso.changeEmail)
    .post('/logon/authentication', sso.authenticate)
    .post('/member/resetPassword', sms.validate, sso.resetPassword)
    .post('/member/resetPasswordByEmail', sso.resetPasswordByEmail)
    .post('/mail/send', captcha.validate, sso.getMailToken, mail.send)
    .get('/member/profile', membership.ensureAuthenticated, membership.loadProfile)
    .post('/logon/logout', sso.logout)
;