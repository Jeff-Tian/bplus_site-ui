var http = require('http'),
    config = require('../config'),
    sso = config.sso,
    proxy = require('./proxy')
    ;

module.exports = {
    setSignedInUser: function (req, res, next) {
        res.locals.applicationId = sso.applicationId;

        if (req.headers.hcd_user) {
            try {
                res.locals.hcd_user = JSON.parse(req.headers.hcd_user);
                req.body.member_id = res.locals.hcd_user.member_id;
            } catch (e) {
                next(e);
            }
        }

        next();
    },

    loadProfile: function (req, res, next) {
        proxy.execute(req, res, next, {
            host: sso.host,
            port: sso.port,
            path: '/profile/load/' + res.locals.hcd_user.member_id,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'HCD Global Web'
            }
        });
    },

    ensureAuthenticated: function (req, res, next) {
        if (res.locals.hcd_user) {
            return next();
        }

        res.send(503);
    }
};