var http = require('http');
var config = require('../config');
var commerceConfig = config.commerce.inner;
var paymentConfig = config.payment.inner;
var gameConfig = config.games;
var proxy = require('./proxy');
var wechat = require('./wechat');
var qs = require('querystring');
var bplusService = config.bplusService;

function injectRedemptionGeneration(res, json, req, next) {
    if (json.isSuccess) {
        proxy({
            host: commerceConfig.host,
            port: commerceConfig.port,
            path: '/service/redemption/generate',
            dataMapper: function (d) {
                d.userId = d.member_id;
                d.productTypeId = gameConfig['national-2015'].productTypeId;

                return d;
            },
            responseInterceptor: function (res, json2, req) {
                console.log('generated redemption result;');
                console.log(json2);
                if (json2.isSuccess) {
                    json.result = json.result || {};
                    json.result.generatedRedemption = json2;

                    // Save generated redemption code to member extension
                    proxy({
                        host: bplusService.host,
                        port: bplusService.port,
                        path: '/profile/membersetting/save',
                        dataMapper: function (d) {
                            d.code = 'redemption-code';
                            d.value = json2.result;

                            return d;
                        },
                        responseInterceptor: function () {
                            // do nothing with this request and response
                            return undefined;
                        }
                    })(req, res, next);
                }

                res.send(json);

                return undefined;
            }
        })(req, res, next);

        return undefined;
    } else {
        return false;
    }
}

module.exports = {
    createOrderByRedemptionCode: proxy({
        host: commerceConfig.host,
        port: commerceConfig.port,
        path: '/service/redemption/redeem',
        dataMapper: function (d) {
            d.userId = d.member_id;
            d.productTypeId = gameConfig['national-2015'].productTypeId;
            return d;
        },
        responseInterceptor: injectRedemptionGeneration
    }),

    checkUserAccessForNationalGame2015: function (req, res, next) {
        proxy({
            host: commerceConfig.host,
            port: commerceConfig.port,
            path: '/service/useraccess/check',
            dataMapper: function (d) {
                d.userId = d.member_id;
                d.productTypeId = gameConfig['national-2015'].productTypeId;
                d.egameId = gameConfig['national-2015'].egameId;
                d.matchId = gameConfig['national-2015'].egameId;

                return d;
            },
            responseInterceptor: function (res, json) {
                console.log('reuslt:');
                console.log(json);
                if (json.result && (json.result.hasRight === false)) {
                    req.body.offerId = json.result.productType.offerId;
                    req.body.productId = json.result.productType.productId;
                    req.body.productTypeId = json.result.productType.productTypeId;

                    return true;
                } else {
                    return false;
                    //req.body.offerId = 'd00b2d92-1995-4a22-a86c-3115518bd635';
                    //req.body.productId = '1ab5f727-5af5-4468-8fbd-530e28579903';
                    //req.body.productTypeId = '96567f8c-9ab0-4f89-8197-163e9dc73bf1';
                    //return true;
                }
            }
        })(req, res, next);
    },

    checkUserAccessForNationalGame2015Middle: function (req, res, next) {
        proxy({
            host: commerceConfig.host,
            port: commerceConfig.port,
            path: '/service/useraccess/check',
            dataMapper: function (d) {
                d.userId = d.member_id;
                d.productTypeId = gameConfig['national-2015-middle'].productTypeId;
                d.egameId = gameConfig['national-2015-middle'].egameId;
                d.matchId = gameConfig['national-2015-middle'].egameId;

                return d;
            },
            responseInterceptor: function (res, json) {
                console.log('reuslt:');
                console.log(json);
                if (json.result && (json.result.hasRight === false)) {
                    req.body.offerId = json.result.productType.offerId;
                    req.body.productId = json.result.productType.productId;
                    req.body.productTypeId = json.result.productType.productTypeId;

                    return true;
                } else {
                    return false;
                    //req.body.offerId = 'd00b2d92-1995-4a22-a86c-3115518bd635';
                    //req.body.productId = '1ab5f727-5af5-4468-8fbd-530e28579903';
                    //req.body.productTypeId = '96567f8c-9ab0-4f89-8197-163e9dc73bf1';
                    //return true;
                }
            }
        })(req, res, next);
    },

    checkUserAccessForNationalGame2015Economy: function (req, res, next) {
        proxy({
            host: commerceConfig.host,
            port: commerceConfig.port,
            path: '/service/useraccess/check',
            dataMapper: function (d) {
                d.userId = d.member_id;
                d.productTypeId = gameConfig['national-2015-economy'].productTypeId;
                d.egameId = gameConfig['national-2015-economy'].egameId;
                d.matchId = gameConfig['national-2015-economy'].egameId;

                return d;
            },
            responseInterceptor: function (res, json) {
                console.log('reuslt:');
                console.log(json);
                if (json.result && (json.result.hasRight === false)) {
                    req.body.offerId = json.result.productType.offerId;
                    req.body.productId = json.result.productType.productId;
                    req.body.productTypeId = json.result.productType.productTypeId;

                    return true;
                } else {
                    return false;
                    //req.body.offerId = 'd00b2d92-1995-4a22-a86c-3115518bd635';
                    //req.body.productId = '1ab5f727-5af5-4468-8fbd-530e28579903';
                    //req.body.productTypeId = '96567f8c-9ab0-4f89-8197-163e9dc73bf1';
                    //return true;
                }
            }
        })(req, res, next);
    },

    checkUserAccessForNationalGame2015AndGenerateRedemptionCodeIfHasRight: function (req, res, next) {
        proxy({
            host: commerceConfig.host,
            port: commerceConfig.port,
            path: '/service/useraccess/check',
            dataMapper: function (d) {
                d.userId = d.member_id;
                d.productTypeId = gameConfig['national-2015'].productTypeId;
                d.egameId = gameConfig['national-2015'].egameId;
                d.matchId = gameConfig['national-2015'].egameId;

                return d;
            },
            responseInterceptor: function (res, json) {
                console.log('reuslt:');
                console.log(json);
                if (json.result.hasRight === false) {
                    req.body.offerId = json.result.productType.offerId;
                    req.body.productId = json.result.productType.productId;
                    req.body.productTypeId = json.result.productType.productTypeId;

                    return true;
                } else {
                    injectRedemptionGeneration(res, json, req, next);

                    return undefined;
                }
            }
        })(req, res, next);
    },

    checkUserAccessForNationalGame2015MiddleAndGenerateRedemptionCodeIfHasRight: function (req, res, next) {
        proxy({
            host: commerceConfig.host,
            port: commerceConfig.port,
            path: '/service/useraccess/check',
            dataMapper: function (d) {
                d.userId = d.member_id;
                d.productTypeId = gameConfig['national-2015-middle'].productTypeId;
                d.egameId = gameConfig['national-2015-middle'].egameId;
                d.matchId = gameConfig['national-2015-middle'].egameId;

                return d;
            },
            responseInterceptor: function (res, json) {
                console.log('reuslt:');
                console.log(json);
                if (json.result.hasRight === false) {
                    req.body.offerId = json.result.productType.offerId;
                    req.body.productId = json.result.productType.productId;
                    req.body.productTypeId = json.result.productType.productTypeId;

                    return true;
                } else {
                    injectRedemptionGeneration(res, json, req, next);

                    return undefined;
                }
            }
        })(req, res, next);
    },

    checkUserAccessForNationalGame2015EconomyAndGenerateRedemptionCodeIfHasRight: function (req, res, next) {
        proxy({
            host: commerceConfig.host,
            port: commerceConfig.port,
            path: '/service/useraccess/check',
            dataMapper: function (d) {
                d.userId = d.member_id;
                d.productTypeId = gameConfig['national-2015-economy'].productTypeId;
                d.egameId = gameConfig['national-2015-economy'].egameId;
                d.matchId = gameConfig['national-2015-economy'].egameId;

                return d;
            },
            responseInterceptor: function (res, json) {
                console.log('reuslt:');
                console.log(json);
                if (json.result.hasRight === false) {
                    req.body.offerId = json.result.productType.offerId;
                    req.body.productId = json.result.productType.productId;
                    req.body.productTypeId = json.result.productType.productTypeId;

                    return true;
                } else {
                    injectRedemptionGeneration(res, json, req, next);

                    return undefined;
                }
            }
        })(req, res, next);
    },

    createOrder: proxy({
        host: commerceConfig.host,
        port: commerceConfig.port,
        path: '/service/order/create',
        dataMapper: function (d) {
            d.userId = d.member_id;

            return d;
        }
    }),

    createOrderByWechat: function (req, res, next) {
        if (!req.query.openid) {
            var returnUrl = req.query.returnUrl || req.body.returnUrl;

            if (returnUrl) {
                req.query.returnUrl = returnUrl;
            }
            return wechat.getOpenId(req, res, next);
        } else {
            req.dualLog('open id got: ');
            req.dualLog(req.query.openid);
        }

        proxy({
            host: commerceConfig.host,
            port: commerceConfig.port,
            path: '/service/order/create',
            dataMapper: function (d) {
                d.userId = d.member_id;

                return d;
            },
            responseInterceptor: function (res, json, req) {
                if (json.isSuccess) {
                    var ip = req.headers['x-forwarded-for'] || req.ip || req._remoteAddress ||
                        (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress)));

                    console.log('original url config: ');
                    console.log(req.originalUrl);

                    var wechatConfig = {
                        orderId: json.result.orderId,
                        returnUrl: req.body.requestFrom || req.originalUrl,
                        payType: 'JSAPI',
                        openId: req.query.openid,
                        ip: ip.replace(/[^0-9\.]/g, '')
                    };

                    console.log('stringified config:');
                    console.log(qs.stringify(wechatConfig));

                    proxy({
                        host: paymentConfig.host,
                        port: paymentConfig.port,
                        path: '/service/payment/wechat/pay?' + qs.stringify(wechatConfig),
                        method: 'GET',
                        responseInterceptor: function (res, json, req) {
                            console.log('got wechat pay response:');
                            console.log(json);

                            return false;
                        }
                    })(req, res, next);

                    return undefined;
                } else {
                    return false;
                }
            }
        })(req, res, next);
    }
};