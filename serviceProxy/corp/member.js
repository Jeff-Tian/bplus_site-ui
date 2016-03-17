var proxy = require('../proxy');
var leaveTrimmer = require('../../utils/leaveTrimmer');
var config = require('../../config');
var corpServiceUrls = leaveTrimmer.trim(config.serviceUrls.corp, '/corp-service-proxy/member');

module.exports = require('express').Router()
    .put(corpServiceUrls.member.register, require('../captcha').validate, proxy.proxyBPlus({
        path: '/corp/member/register',
        method: 'POST'
    }))
    .post(corpServiceUrls.member.login, proxy.proxyBPlus({
        path: '/corp/member/logon',
        method: 'POST',
        responseInterceptor: function (originalResponse, upstreamJson, originalRequest, next) {
            var sso = require('../sso.js');

            if (upstreamJson.isSuccess) {
                sso.setAuthToken(originalResponse, upstreamJson.result.token, originalRequest.body.remember, upstreamJson.result.member_id);

                if (sso.jumpToReturnUrl(originalRequest, originalResponse)) {
                    return undefined;
                }
            }

            return false;
        }
    }))
;
