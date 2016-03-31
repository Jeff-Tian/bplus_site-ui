var proxy = require('../proxy');
var cv = require('express').Router();
var config = require('../../config');
Object.keys(config.serviceUrls.corp.candidate).forEach(function (key) {
    cv.post('/' + key, proxy.proxyBPlus({
        path: '/corp/candidate/' + key,
        method: 'POST'
    }));
});

module.exports = cv;
