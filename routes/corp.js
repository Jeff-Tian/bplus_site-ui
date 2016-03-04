var corp = require('express')();
var fs = require('fs');
var path = require('path');
var mixedViewEngine = require('./mixedViewEngine');

var config = require('../config/index');

function filterConfig(config) {
    var filtered = {};

    filtered.serviceUrls = config.serviceUrls;
    filtered.sharedUIPath = '/bower/SHARED-UI/';
    filtered.cdn = config.cdn;
    filtered.payment = config.payment.public;
    filtered.onlineStoreMenuSource = config.onlineStoreMenuSource;

    return filtered;
}

corp.use(function (req, res, next) {
    //res.send('ok');
    next();
});

corp.get('/', function (req, res, next) {
    mixedViewEngine.render(res, 'corp/index.jade', 'layout.jade', {
        cdn: config.cdn
    });
});

corp.get('/my', function (req, res, next) {
    mixedViewEngine.render(res, 'study-center.jade', 'study-center-layout.jade', {
        cdn: config.cdn
    });
});

function cdnify(url, cdn) {
    return cdn.normal + url + '?' + cdn.version;
}

module.exports = corp;