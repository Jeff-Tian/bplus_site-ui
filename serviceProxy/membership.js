var http = require('http'),
    config = require('../config'),
    sso = config.sso,
    proxy = require('./proxy'),
    localeHelper = require('../locales/localeHelper')
    ;

module.exports = {
    setSignedInUser: function (req, res, next) {
        res.locals.applicationId = config.applicationId;

        if (req.headers.hcd_user) {
            req.logger.info('request header hcd_user info:');
            req.logger.info(req.headers.hcd_user);
        }

        if (req.headers.hcd_user) {
            try {
                res.locals.hcd_user = JSON.parse(req.headers.hcd_user);
                res.locals.signedIn = !!res.locals.hcd_user.member_id;
                req.body.member_id = res.locals.hcd_user.member_id;
            } catch (e) {
                res.locals.signedIn = false;

                next(e);
            }
        } else {
            res.locals.signedIn = false;
        }

        next();
    },

    loadProfile: function (req, res, next) {
        if (!res.locals.hcd_user || !res.locals.hcd_user.member_id) {
            res.json({isSuccess: true, code: '0', result: {}});

            return;
        }

        proxy.execute(req, res, next, {
            host: sso.host,
            port: sso.port,
            path: '/profile/load/' + res.locals.hcd_user.member_id,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'BridgePlus Web'
            }
        });
    },

    ensureAuthenticated: function (req, res, next) {
        if (res.locals.hcd_user) {
            return next();
        } else {
            var locale = localeHelper.getLocale(req.url, req);
            var url = '/sign-in';
            url += '?return_url=' + encodeURIComponent(req.url);

            if (!req.xhr) {
                res.redirect(localeHelper.generateLocaleLink(url, locale));
            } else {
                res.status(401).send({code: '401', message: 'You are not allowed to access this page.'});
            }
        }
    }
};