var http = require('http');
var sso = require('../config').sso;
var proxy = require('./proxy');

module.exports = {
    signUp: proxy(sso.host, sso.port, '/member/register', function (d) {
        d.application_id = sso.applicationId;
        return d;
    })
};