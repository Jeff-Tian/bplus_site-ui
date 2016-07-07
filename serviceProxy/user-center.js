var proxy = require('node-service-proxy');
var config = require('../config');

function proxyGetToPost(router, which) {
    return proxyToPost(router, which, 'get');
}

function proxyPostToPost(router, which) {
    return proxyToPost(router, which, 'post');
}

function proxyToPost(router, which, method) {
    return router[method](which.abbr, function (req, res, next) {
        proxy(req, res, next, {
            host: config.userCenterService.inner.host,
            port: config.userCenterService.inner.port,
            path: which.upstream,
            dataMapper: function (d) {
                d.userId = d.member_id;
                return d;
            },
            method: 'POST'
        });
    });
}

var router = require('express').Router();

proxyGetToPost(router, config.serviceUrls.userCenter.bbCoin);
proxyGetToPost(router, config.serviceUrls.userCenter.myProducts);
proxyPostToPost(router, config.serviceUrls.userCenter.bbCoinHistory);

module.exports = router;