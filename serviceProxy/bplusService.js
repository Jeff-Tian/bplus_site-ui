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
    d.qualification_id = d.educationBackground;
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
        path: '/profile/education/add',
        dataMapper: mapEducation
    }),

    updateEducation: proxyBPlus({
        path: '/profile/education/update',
        dataMapper: function (d) {
            d.education_id = d.educationId;
            delete d.educationId;

            return mapEducation(d);
        }
    })
};