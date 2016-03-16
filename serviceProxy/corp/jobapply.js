var proxy = require('../proxy');
var cv = require('express').Router();
var config = require('../../config');
Object.keys(config.serviceUrls.corp.jobapply).forEach(function(key){
    cv.post('/' + key, proxy.proxyBPlus({
        path: '/corp/jobApply/' + key,
        method: 'POST'
    }));
});

module.exports = cv;
