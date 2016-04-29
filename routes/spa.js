var express = require('express');
var router = express.Router();

router.use('/', require('prerender-node'), function (req, res, next) {
    res.render('spa/index.jade', {
        cdn: require('../config').cdn
    });
});

module.exports = router;