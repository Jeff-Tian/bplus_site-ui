var proxy = require('node-service-proxy');
var config = require('../config');

module.exports = require('express').Router()
    .get(config.serviceUrls.userCenter.bbCoin.abbr, function (req, res, next) {
        proxy(req, res, next, {
            host: config.userCenterService.inner.host,
            port: config.userCenterService.inner.port,
            path: config.serviceUrls.userCenter.bbCoin.upstream,
            dataMapper: function (d) {
                d.userId = d.member_id;
                return d;
            },
            method: 'POST'
        })
    });
;