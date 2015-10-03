var http = require('http');
var bplusService = require('../config').bplusService;
var proxy = require('./proxy');

function proxyBPlus(options) {
    return function (req, res, next) {
        options.host = bplusService.host;
        options.port = bplusService.port;

        proxy(options)(req, res, next);
    }
}

function mapEducation(d) {
    d.qualifications_id = d.educationBackground;
    delete d.educationBackground;
    d.university = d.name;
    delete d.name;

    if (d.startYear && d.startMonth) {
        d.start_date = new Date(Date.UTC(d.startYear, Number(d.startMonth) - 1, 1));
    }
    delete d.startYear;
    delete d.startMonth;

    if (d.endYear && d.endMonth) {
        d.end_date = new Date(Date.UTC(d.endYear, Number(d.endMonth) - 1, 1));
    }
    delete d.endYear;
    delete d.endMonth;

    return d;
}

module.exports = {
    loadProfile: function (req, res, next) {
        proxyBPlus({path: '/profile/load/' + res.locals.hcd_user.member_id})(req, res, next);
    },

    updateProfile: proxyBPlus({
        path: '/profile/memberExt/update',
        dataMapper: function (d) {
            d.current_location = d.currentLocation;
            d.hide_birthday = d.setPrivacy;

            return d;
        }
    }),

    addEducation: proxyBPlus({
        path: '/profile/education/add'
    }),

    updateEducation: proxyBPlus({
        path: '/profile/education/update',
        dataMapper: function (d) {
            d.education_id = d.educationId;
            delete d.educationId;

            return d;
        }
    }),

    dataSanitanze: function (req, res, next) {
        mapEducation(req.body);
        next();
    },

    dataValidate: function (req, res, next) {
        if (req.body.end_date < req.body.start_date) {
            res.status(401).json({
                code: 'DATA_ERROR',
                message: 'The end date should not be earlier than the start date'
            });
        } else {
            next();
        }
    },

    getResource: function (req, res, next) {
        var language = 'zh-CN';

        if (req.params.language === 'en') {
            language = 'en-US';
        }

        proxyBPlus({
            path: '/resource/load/' + req.params.resourceKey + '/' + language
        })(req, res, next);
    }
};