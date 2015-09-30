module.exports = require('express').Router()
    .use(function (req, res, next) {
        req.dualLog('mobile is being calling from ' + req.host + '...');
        req.dualLog(req.url);

        next();
    })
    .get('/sign-in', function (req, res, next) {
        res.render('mobile/sign-in');
    })
;