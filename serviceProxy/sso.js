var http = require('http');
var sso = require('../config').sso;
var proxy = require('./proxy');

function proxySSO(options) {
    options.host = sso.host;
    options.port = sso.port;
    options.dataMapper = function (d) {
        d.application_id = sso.applicationId;
        return d;
    };

    return proxy(options);
}

module.exports = {
    signUp: proxySSO({path: '/member/register'}),
    authenticate: proxySSO({
        path: '/logon/authentication', responseInterceptor: function (responseStream, responseJson) {
            if (responseJson.isSuccess) {
                responseStream.cookie('token', responseJson.result.token, {
                    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)),
                    path: '/',
                    httpOnly: true
                });
            }
        }
    }),
    resetPassword: proxySSO({path: '/member/resetPassword'}),
    logout: proxySSO({
        path: '/logon/logout', requestInterceptor: function (requestFrom, requestTo) {
            if (requestFrom.headers.cookie) {
                var token = requestFrom.headers.cookie.match(/(?:^|;) *token=([^;]*)/)[1];

                console.log('logout for "' + token + '"');

                requestTo.write(JSON.stringify({token: token}));
            }
        },
        responseInterceptor: function (responseStream, responseJson) {
            //responseStream.writeHead(301, {
            //    'Location': '/'
            //});
        }
    })
};