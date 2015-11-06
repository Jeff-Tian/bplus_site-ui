var sms = require('./sms'),
    captcha = require('./captcha'),
    sso = require('./sso'),
    mail = require('./mail'),
    membership = require('./membership'),
    bplusService = require('./bplusService'),
    wechat = require('./wechat'),
    commerceService = require('./commerceService'),
    uploadCallbackService = require('./uploadCallbackService')
    ;

module.exports = require('express').Router()
    .use(function (req, res, next) {
        req.dualLog('service-proxy is being calling from ' + req.hostname + '...');
        req.dualLog(req.url);

        next();
    })
    .post('/sms/send', captcha.validate, sms.getVerificationCode)
    .post('/member/register', sms.validate, sso.signUp)
    .post('/member/change-mobile', membership.ensureAuthenticated, sms.validate, sso.authenticateCurrentUser, sso.changeMobile)
    .post('/member/bind-mobile', membership.ensureAuthenticated, sms.validate, sso.changeMobile)
    .post('/member/bind-mobile-by-password', sso.authenticate /* TODO : Bind wechat to member account  */)
    .post('/member/change-email', membership.ensureAuthenticated, sso.changeEmail)
    .post('/member/change-password', membership.ensureAuthenticated, sso.authenticateCurrentUser, sso.changePassword)
    .post('/member/update-sso-profile', membership.ensureAuthenticated, sso.updateProfile)
    .post('/member/update-profile', membership.ensureAuthenticated, bplusService.updateProfile)
    .post('/member/save-interests', membership.ensureAuthenticated, bplusService.saveInterests)
    .post('/member/add-education', membership.ensureAuthenticated, bplusService.dataSanitanze, bplusService.dataValidate, bplusService.addEducation)
    .post('/member/update-education', membership.ensureAuthenticated, bplusService.dataSanitanze, bplusService.dataValidate, bplusService.updateEducation)
    .post('/logon/authentication', sso.authenticate)
    .post('/logon/by-token', sso.setAuthToken)
    .post('/member/resetPassword', sms.validate, sso.resetPassword)
    .post('/member/resetPasswordByEmail', sso.resetPasswordByEmail)
    .post('/mail/send', captcha.validate, sso.getMailToken, mail.tokenCheck, mail.send)
    .post('/mail/send-verification', sso.getMailVerificationToken, mail.tokenCheck, mail.sendVerification)
    .get('/member/profile', membership.loadProfile)
    .get('/member/bplus-profile', membership.ensureAuthenticated, bplusService.loadProfile)
    .get('/member/bplus-profile-all', membership.ensureAuthenticated, bplusService.loadProfileAll)
    .post('/member/:classification/:operation', membership.ensureAuthenticated, bplusService.updateData)
    .post('/logon/logout', sso.logout)
    .post('/logon/by-wechat', wechat.qrLogon)
    .post('/logon/from-wechat', wechat.oAuthLogon)
    .post('/bind-wechat', wechat.bind)
    .get('/bplus-resource/:resourceKey/:language', bplusService.getResource)
    .get('/upload/callback', uploadCallbackService)
    .post('/commerce/create-order/national-game-2015/by-redemption-code', membership.ensureAuthenticated, commerceService.createOrderByRedemptionCode)
    .post('/payment/create-order/national-game-2015/by-alipay', membership.ensureAuthenticated, commerceService.checkUserAccessForNationalGame2015AndGenerateRedemptionCodeIfHasRight, commerceService.createOrder)
    .post('/payment/create-order/national-game-2015/by-wechat', membership.ensureAuthenticated, commerceService.checkUserAccessForNationalGame2015AndGenerateRedemptionCodeIfHasRight, commerceService.createOrderByWechat)
    .post('/payment/create-order/national-game-2015/check-has-right', membership.ensureAuthenticated, commerceService.checkUserAccessForNationalGame2015, function (req, res, next) {
        res.send(req.chunks);
    })
;