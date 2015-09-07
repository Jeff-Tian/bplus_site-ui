var http = require('http');
var sso = require('../config').sso;
var proxy = require('./proxy');

function appendApplicationId(d) {
    d.application_id = sso.applicationId;

    return d;
}

module.exports = {
    signUp: proxy(sso.host, sso.port, '/member/register', appendApplicationId),
    authenticate: proxy(sso.host, sso.port, '/logon/authentication', appendApplicationId)
};