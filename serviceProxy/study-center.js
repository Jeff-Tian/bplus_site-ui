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
    .get(studyCenterServiceUrls.classBooking.unevaluated, proxyBPlus({
        path: '/classBooking/unevaluated',
        method: 'POST'
    }))
    .get(studyCenterServiceUrls.classBooking.evaluated, proxyBPlus({
        path: '/classBooking/evaluated',
        method: 'POST'
    }))
    .get(studyCenterServiceUrls.my.favorite.teachers, proxyBPlus({
        path: '/my/favorite/loadex', method: 'POST', dataMapper: function (d) {
            d.category = 'teacher';

            return d;
        }
    }))
    .delete(studyCenterServiceUrls.my.favorite.teachers, function (req, res, next) {
        return proxyBPlus({
            path: '/my/favorite/remove', method: 'POST', dataMapper: function (d) {
                d.category = 'teacher';
                d.item_id = req.query.teacher_id;

                return d;
            }
        })(req, res, next);
    })
;