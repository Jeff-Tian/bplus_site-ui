var http = require('http');
var bplusService = require('../config').bplusService;
var proxy = require('./proxy');

module.exports = {
    updateProfile: function (req, res, next) {
        proxy({
            host: bplusService.host,
            port: bplusService.port,
            path: '/profile/memberExt/update',
            dataMapper: function (d) {
                d.current_location = d.currentLocation;
                d.hide_birthday = d.setPrivacy;

                return d;
            }
        })(req, res, next);
    },

    saveEducation: function (req, res, next) {
        proxy({
            host: bplusService.host,
            port: bplusService.port,
            path: '/profile/education/add',
            dataMapper: function (d) {
                return d;
            }
        })(req, res, next);
    }
};