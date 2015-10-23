var http = require('http');
var config = require('../config');
var commerceConfig = config.commerce;
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
    })
};