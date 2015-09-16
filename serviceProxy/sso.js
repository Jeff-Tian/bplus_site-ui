var http = require('http');
var sso = require('../config').sso;
var proxy = require('./proxy');
var membership = require('./membership.js');

function proxySSO(options) {
    options.host = sso.host;
    options.port = sso.port;
    if (!options.dataMapper) {
        options.dataMapper = function (d) {
            d.application_id = sso.applicationId;
            return d;
        };
    }

    return proxy(options);
}

module.exports = {
    signUp: proxySSO({path: '/member/register'}),
    authenticate: function (req, res, next) {
        console.log('auth: ' + JSON.stringify(req.body));

        proxySSO({
            path: '/logon/authentication',
            responseInterceptor: function (responseStream, responseJson) {
                if (responseJson.isSuccess) {
                    responseStream.cookie('token', responseJson.result.token, {
                        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)),
                        path: '/',
                        httpOnly: true
                    });
                }
            }
        })(req, res, next);
    },
    authenticateCurrentUser: function (req, res, next) {
        var options = {
            host: sso.host,
            port: sso.port,
            path: '/profile/load/' + res.locals.hcd_user.member_id,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'BridgePlus Web'
            }
        };

        var chunks = [];

        var request = http.request(options, function (response) {
            response.on('data', function (c) {
                chunks.push(c);
            });

            response.on('end', function () {
                chunks = Buffer.concat(chunks);

                try {
                    chunks = JSON.parse(chunks.toString());

                    if (chunks.isSuccess && chunks.result) {
                        console.log('result = ' + JSON.stringify(chunks.result));

                        console.log('body:');
                        console.log(req.body);

                        proxySSO({
                            path: '/logon/authentication',
                            dataMapper: function (d) {
                                d.value = chunks.result.mobile;
                                d.application_id = sso.applicationId;
                                console.log('authcurrent = ' + JSON.stringify(d));
                                console.log('authcurrent.result = ' + JSON.stringify(chunks.result));
                                return d;
                            },
                            responseInterceptor: function (responseStream, responseJson) {
                                console.log('authcurrent response = ');
                                console.log(responseJson);

                                if (responseJson.isSuccess) {
                                    //responseStream.cookie('token', responseJson.result.token, {
                                    //    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)),
                                    //    path: '/',
                                    //    httpOnly: true
                                    //});

                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        })(req, res, next);
                    } else {
                        res.send(chunks);
                    }
                } catch (ex) {
                    console.log('error!');
                    console.log(chunks.toString());
                    return next(ex);
                }
            });

            response.on('error', next);
        });

        //var data = req.body;
        //
        //if (data) {
        //    request.write(JSON.stringify(data));
        //}

        request.on('error', next);

        request.end();
    },
    resetPassword: proxySSO({
        path: '/member/resetPassword'
    }),
    resetPasswordByEmail: proxySSO({path: '/member/password/resetByMail'}),
    logout: proxySSO({
        path: '/logon/logout', requestInterceptor: function (requestFrom, requestTo) {
            if (requestFrom.headers.cookie) {
                var token = requestFrom.headers.cookie.match(/(?:^|;) *token=([^;]*)/)[1];

                requestTo.write(JSON.stringify({token: token}));
            }
        },
        responseInterceptor: function (responseStream, responseJson) {
            responseStream.location('/');
        }
    }),
    getMailToken: proxySSO({
        path: '/member/password/mailToken',
        dataMapper: function (d) {
            d.mail = d.to;
            return d;
        },
        responseInterceptor: function (res, json) {
            if (json.isSuccess && json.result) {
                res.locals.mailToken = json.result;
                return true;
            } else {
                res.status(503);
                return false;
            }
        }
    }),
    changeMobile: function (req, res, next) {
        console.log('changing...');

        proxySSO({
            path: '/profile/update',
            dataMapper: function (d) {
                console.log('change mobile');
                console.log(d);

                return d;
            },
            responseInterceptor: function (res, json) {
                console.log('changed');
                console.log(json);

                if (json.isSuccess && json.result) {
                    return true;
                } else {
                    return false;
                }
            }
        })(req, res, next);
    },
    changeEmail: proxySSO({
        path: '/profile/update',
        dataMapper: function (d) {
            delete d.mobile;
            d.application_id = sso.applicationId;
            d.mail = d.email;

            console.log('changing mobile:');
            console.log(d);

            return d;
        }
    })
};