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

router.use(localeHelper.localePath('/spa', false), require('./spa.js'));

module.exports = router;