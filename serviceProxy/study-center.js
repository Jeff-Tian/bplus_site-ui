var proxy = require('./proxy');

var leaveTrimmer = require('../utils/leaveTrimmer');
var config = require('../config');
var studyCenterServiceUrls = leaveTrimmer.trim(config.serviceUrls.studyCenter, '/service-proxy/study-center');

function proxyBPlus(options) {
    return function (req, res, next) {
        options.host = config.bplusService.host;
        options.port = config.bplusService.port;

        proxy(options)(req, res, next);
    }
}

module.exports = require('express').Router()
    .get(studyCenterServiceUrls.classBooking.coming, proxyBPlus({path: '/classBooking/coming', method: 'POST'}))
;