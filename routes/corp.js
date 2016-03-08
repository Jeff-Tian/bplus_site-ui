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

function routerFactory(name, target) {
    if (!target) {
        target = name;
    }
    if (target === '') {
        target = 'index';
    }
    corp.get('/' + name, function (req, res, next) {
        mixedViewEngine.render(res, 'corp/' + target + '.jade', 'layout.jade', {
            cdn: config.cdn
        });
    });
}
//Index
routerFactory("");
//Regist
routerFactory("regist");
//CV
routerFactory("cv");

corp.use(function (req, res, next) {
    //res.send('ok');
    next();
});

function cdnify(url, cdn) {
    return cdn.normal + url + '?' + cdn.version;
}

module.exports = corp;