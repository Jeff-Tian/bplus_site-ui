var http = require('http');
var config = require('../config');
var commerceConfig = config.commerce.inner;
var gameConfig = config.games;
var proxy = require('./proxy');

module.exports = {
    createOrderByRedemptionCode: proxy({
        host: commerceConfig.host,
        port: commerceConfig.port,
        path: '/service/redemption/redeem',
        dataMapper: function (d) {
            d.userId = d.member_id;
            return d;
        }
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
                    return false;
                    //req.body.offerId = 'd00b2d92-1995-4a22-a86c-3115518bd635';
                    //req.body.productId = '1ab5f727-5af5-4468-8fbd-530e28579903';
                    //req.body.productTypeId = '96567f8c-9ab0-4f89-8197-163e9dc73bf1';
                    //return true;
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
    })
};