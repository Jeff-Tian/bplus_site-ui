var http = require('http');
var config = require('../config');
var linkedIn = config.thirdPartyLogon;
var proxy = require('./proxy');

var leaveTrimmer = require('../utils/leaveTrimmer');
var linkedInServiceUrls = leaveTrimmer.trim(config.serviceUrls.linkedIn, '/service-proxy/linked-in');


function proxyLinkedIn(options) {
    options.host = linkedIn.host;
    options.port = linkedIn.port;

    var dm = options.dataMapper;

    options.dataMapper = function (d, req) {
        d.application_id = config.applicationId;
        d.app_id = linkedIn.app_id;

        return typeof dm === 'function' ? dm(d, req) : d;
    };

    return proxy(options);
}

var m = {
    oAuthLogon: function (req, res, next) {
        proxyLinkedIn({
            path: config.serviceUrls.linkedIn.oauth.serverSide,
            method: 'POST'
        })(req, res, next);
    },

    bind: proxyLinkedIn({
        path: '/wechat/qr/bind',
        method: 'POST'
    }),

    getOpenId: proxyLinkedIn({
        path: '/wechat/oauth/openid',
        method: 'POST',
        dataMapper: function (d, req) {
            req.dualLogError('partner = ' + d.partner + ' when getting openid');
            d.app_id = linkedIn.corp_app_id;
            d.returnUrl = req.query.returnUrl || req.body.returnUrl || req.headers['referer'] || (req.headers['origin'] + req.originalUrl);
            delete d.href;

            return d;
        },
        responseInterceptor: function (res, json, req) {
            if (json.isSuccess) {

                if (!req.xhr) {
                    res.redirect(json.result);
                } else {
                    res.json({
                        isSuccess: false,
                        code: '302',
                        message: json.result
                    });
                }

                return undefined;
            }

            return false;
        }
    }),

    getJsApiConfig: proxyLinkedIn({
        path: '/wechat/js_signature',
        method: 'POST',
        dataMapper: function (d) {
            d.app_id = linkedIn.corp_app_id;

            return d;
        },
        responseInterceptor: function (res, json, req) {
            res.json({
                isSuccess: true,
                result: json
            });

            return undefined;
        }
    })
};

module.exports = require('express').Router()
    .post(linkedInServiceUrls.oauth.frontEnd, m.oAuthLogon)
;