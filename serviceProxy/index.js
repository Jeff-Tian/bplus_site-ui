var sms = require('./sms'),
    captcha = require('./captcha'),
    sso = require('./sso'),
    mail = require('./mail'),
    membership = require('./membership'),
    bplusService = require('./bplusService')
    ;

module.exports = require('express').Router()
    .post('/sms/send', captcha.validate, sms.getVerificationCode)
    .post('/member/register', sms.validate, sso.signUp)
    .post('/member/change-mobile', membership.ensureAuthenticated, sms.validate, sso.authenticateCurrentUser, sso.changeMobile)
    .post('/member/change-email', membership.ensureAuthenticated, sso.changeEmail)
    .post('/member/change-password', membership.ensureAuthenticated, sso.authenticateCurrentUser, sso.changePassword)
    .post('/member/update-sso-profile', membership.ensureAuthenticated, sso.updateProfile)
    .post('/member/update-profile', membership.ensureAuthenticated, bplusService.updateProfile)
    .post('/member/add-education', membership.ensureAuthenticated, bplusService.addEducation)
    .post('/member/update-education', membership.ensureAuthenticated, bplusService.updateEducation)
    .post('/logon/authentication', sso.authenticate)
    .post('/member/resetPassword', sms.validate, sso.resetPassword)
    .post('/member/resetPasswordByEmail', sso.resetPasswordByEmail)
    .post('/mail/send', captcha.validate, sso.getMailToken, mail.send)
    .get('/member/profile', membership.ensureAuthenticated, membership.loadProfile)
    .get('/member/bplus-profile', membership.ensureAuthenticated, bplusService.loadProfile)
    .post('/logon/logout', sso.logout)
;