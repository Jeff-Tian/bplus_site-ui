var express = require('express');
var fs = require('fs');
var localeHelper = require('../locales/localeHelper.js');
var membership = require('../serviceProxy/membership.js');

var router = express.Router();

router.use(localeHelper.localePath('/store', false), membership.ensureAuthenticated, require('../store'));

router.use(localeHelper.localePath('/study-center', true), function (req, res, next) {
    res.redirect('/study-center/');
});

router.use(localeHelper.localePath('/study-center', false), membership.ensureAuthenticated, require('./study-center.js'));

router.use('/config', require('./student-config.js'));

router.get('/linked-in/oauth/callback', function (req, res, next) {
    res.render('third-party-interactives/linked-in-callback.jade');
});

router.get('/message-listener', function (req, res) {
    res.render('third-party-interactives/messageListener.jade');
});

router.get('/:lang?/personal-history', membership.ensureAuthenticated, function (req, res, next) {
    res.render('personal-history.html');
});

module.exports = router;