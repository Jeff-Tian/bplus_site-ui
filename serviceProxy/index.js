var sms = require('./sms'),
    captcha = require('./captcha'),
    sso = require('./sso'),
    mail = require('./mail'),
    membership = require('./membership'),
    bplusService = require('./bplusService'),
    wechat = require('./wechat'),
    commerceService = require('./commerceService'),
    uploadCallbackService = require('./uploadCallbackService'),
    config = require('../config')
    ;

var serviceUrls = {};
for (var url in config.serviceUrls) {
    serviceUrls[url] = config.serviceUrls[url].replace('/service-proxy', '');
}

module.exports = require('express').Router()
    .use(function (req, res, next) {
        req.dualLog('service-proxy is being calling from this host: ' + req.hostname + '...');
        req.dualLog((req.headers['origin'] || '') + req.originalUrl);

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
    .post('/member/get-setting', bplusService.getSetting)
    .post('/member/add-education', membership.ensureAuthenticated, bplusService.dataSanitanze, bplusService.dataValidate, bplusService.addEducation)
    .post('/member/update-education', membership.ensureAuthenticated, bplusService.dataSanitanze, bplusService.dataValidate, bplusService.updateEducation)
    .post(serviceUrls.logOnAuthenticate, sso.authenticate)
    .post(serviceUrls.logOnByToken, sso.setAuthToken)
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
    .post(serviceUrls.logOnFromWechat, wechat.oAuthLogon)
    .post('/bind-wechat', wechat.bind)
    .get('/bplus-resource/:resourceKey/:language', bplusService.getResource)
    .get('/upload/callback', uploadCallbackService)

    .post('/payment/create-order/national-upsell-:option/by-b_alipay', membership.ensureAuthenticated, commerceService.createOrder)

    .post(serviceUrls.createOrderAndPayByWechat, membership.ensureAuthenticated, commerceService.checkUserAccessAndGenerateRedemptionCodeIfHasRight, commerceService.createOrderByWechat)
    .post(serviceUrls.createOrderAndPayByAlipay, membership.ensureAuthenticated, commerceService.checkUserAccessAndGenerateRedemptionCodeIfHasRight, commerceService.createOrder)

    .post('/payment/create-upsell-order/by-b_alipay', membership.ensureAuthenticated, commerceService.createOrder)

    .post(serviceUrls.createOrderAndPayByRedemptionCode, membership.ensureAuthenticated, commerceService.createUpSellOrderByRedemptionCode)

    .post(serviceUrls.checkNationalGame2015OrderPayment,
    membership.ensureAuthenticated,
    commerceService.checkUserAccessForNationalGame2015,
    commerceService.checkUserAccessForNationalGame2015Middle,
    commerceService.checkUserAccessForNationalGame2015Economy,
    commerceService.checkUserAccessForRepechages2015,
    commerceService.checkUserAccessForRepechages2015Middle,
    commerceService.checkUserAccessForRepechages2015Economy,
    function (req, res, next) {
        res.send(req.chunks);
    })
    .post(serviceUrls.wechatJsApiConfig, wechat.getJsApiConfig)

    .get(serviceUrls.getMyOrderList, membership.ensureAuthenticated, commerceService.getMyOrderList)
    .get(serviceUrls.getOrderDetail, membership.ensureAuthenticated, commerceService.getOrderDetail)
;