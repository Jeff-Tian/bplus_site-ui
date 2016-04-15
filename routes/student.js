var express = require('express');
var fs = require('fs');
var localeHelper = require('../locales/localeHelper.js');
var membership = require('../serviceProxy/membership.js');

var router = express.Router();

router.use(localeHelper.localePath('/store', false), membership.ensureAuthenticated, require('../store'));

router.use(localeHelper.localePath('/study-center', false), membership.ensureAuthenticated, require('./study-center.js'));

module.exports = router;