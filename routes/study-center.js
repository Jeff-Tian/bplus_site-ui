var router = require('express').Router();
var fs = require('fs');
var config = require('../config/index');
var mixedEngine = require('./mixedViewEngine');

router.use(function (req, res, next) {
    //res.send('ok');
    next();
});

router.get('/', function (req, res, next) {
    res.redirect('/study-center/my');
});

router.get('/my', function (req, res, next) {
    mixedEngine.render(res, 'study-center.jade', 'study-center-layout.jade', {
        cdn: config.cdn,
        title: '学习中心'
    });
});

module.exports = router;