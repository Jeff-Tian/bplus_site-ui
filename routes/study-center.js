var router = require('express').Router();
var fs = require('fs');
var path = require('path');
var config = require('../config/index');
var mixedEngine = require('./mixedViewEngine');

function filterConfig(config) {
    var filtered = {};

    filtered.serviceUrls = config.serviceUrls;
    filtered.sharedUIPath = '/bower/SHARED-UI/';
    filtered.cdn = config.cdn;
    filtered.payment = config.payment.public;
    filtered.onlineStoreMenuSource = config.onlineStoreMenuSource;

    return filtered;
}

router.use(function (req, res, next) {
    //res.send('ok');
    next();
});

router.get('/', function (req, res, next) {
    res.redirect('/study-center/my');
});

router.get('/my', function (req, res, next) {
    mixedEngine.render(res, 'study-center.jade', 'study-center-layout.jade', {
        cdn: config.cdn,
        title: '学习中心'
    });
});

function cdnify(url, cdn) {
    return cdn.normal + url + '?' + cdn.version;
}

module.exports = router;