var http = require('http');
var sso = require('../config').sso;
var proxy = require('./proxy');

function appendApplicationId(d) {
    d.application_id = sso.applicationId;

    return d;
}

function proxySSO(path) {
    return proxy(sso.host, sso.port, path, appendApplicationId);
}

var pathMapping = {
    signUp: '/member/register',
    authenticate: '/logon/authentication',
    resetPassword: '/member/resetPassword'
};

var res = {};
for (var key in pathMapping) {
    res[key] = proxySSO(pathMapping[key]);
}

module.exports = res;