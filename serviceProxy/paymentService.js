var http = require('http');
var config = require('../config');
var paymentConfig = config.payment.inner;
var proxy = require('./proxy');

module.exports = {
    createOrderByRedemptionCode: proxy({
        host: paymentConfig.host,
        port: paymentConfig.port,
        path: '/service/redemption/redeem',
        dataMapper: function (d) {
            d.userId = d.member_id;

            return d;
        }
    })
};