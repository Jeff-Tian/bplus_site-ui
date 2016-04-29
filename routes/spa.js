var express = require('express');
var router = express.Router();

router.use('/', function (req, res, next) {
    res.render('spa/index.jade', {
        cdn: require('../config').cdn
    });
});

module.exports = router;