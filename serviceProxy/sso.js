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

var result = {};
for (var key in pathMapping) {
    result[key] = proxySSO(pathMapping[key]);
}

result.authenticate = proxy({
    host: sso.host,
    port: sso.port,
    path: pathMapping.authenticate,
    dataMapper: appendApplicationId,
    responseInterceptor: function (responseStream, responseJson) {
        if (responseJson.isSuccess) {
            responseStream.cookie('token', responseJson.result.token, {
                expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)),
                path: '/',
                httpOnly: true
            });
        }
    }
});

module.exports = result;