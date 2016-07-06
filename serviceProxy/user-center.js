var proxy = require('node-service-proxy');
var config = require('../config');

module.exports = require('express').Router()
    .get('/bbcoin', function (req, res, next) {
        proxy(req, res, next, {
            host: config.userCenterService.inner.host,
            port: config.userCenterService.inner.port,
            dataMapper: function (d) {
                d.userId = d.member_id;
                return d;
            },
            method: 'POST'
        })
    });
;