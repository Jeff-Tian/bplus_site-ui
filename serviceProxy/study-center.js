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
    .get(studyCenterServiceUrls.classBooking.unevaluated, function (req, res, next) {
        return proxyBPlus({
            path: '/classBooking/unevaluated',
            method: 'POST',
            dataMapper: function (d) {
                d.pageSize = req.query.pageSize;
                d.page = req.query.page;

                return d;
            }
        })(req, res, next);
    })
    .get(studyCenterServiceUrls.classBooking.evaluated, function (req, res, next) {
        return proxyBPlus({
            path: '/classBooking/evaluated',
            method: 'POST',
            dataMapper: function (d) {
                d.pageSize = req.query.pageSize;
                d.page = req.query.page;

                return d;
            }
        })(req, res, next);
    })
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
    .get(studyCenterServiceUrls.teacher.latestCourses, function (req, res, next) {
        return proxyBPlus({
            path: '/teacher/latestclass', method: 'POST', dataMapper: function (d) {
                d.teacher_id = req.params.teacherId;

                return d;
            }
        })(req, res, next);
    })
    .get(studyCenterServiceUrls.classFeedback, function (req, res, next) {
        return proxyBPlus({
            path: '/classfeedback/load/' + req.params.feedbackId
        })(req, res, next);
    })
    .put(studyCenterServiceUrls.teacher.feedback, proxyBPlus({
        path: '/classfeedback/toTeacher',
        method: 'POST'
    }))
;