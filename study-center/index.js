var router = require('express').Router();
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var ejs = require('ejs');
var config = require('../config');

function filterConfig(config) {
    var filtered = {};

    filtered.serviceUrls = config.serviceUrls;
    filtered.sharedUIPath = '/bower/SHARED-UI/';
    filtered.cdn = config.cdn;
    filtered.payment = config.payment.public;
    filtered.onlineStoreMenuSource = config.onlineStoreMenuSource;

    return filtered;
}

router.use(function (req, res, next) {
    //res.send('ok');
    next();
});

router.get('/config.js', function (req, res, next) {
    res.setHeader("Content-Type", "text/javascript; charset=utf-8");
    res.send('if (typeof angular !== "undefined") {angular.onlineStore = angular.onlineStore || {}; angular.onlineStore.config = ' + JSON.stringify(filterConfig(config)) + '; }');
});

router.get('/my', function (req, res, next) {
    renderMixin(res, 'study-center.jade', 'study-center-layout.jade', {
        cdn: config.cdn
    });
});

function cdnify(url, cdn) {
    return cdn.normal + url + '?' + cdn.version;
}

var fs = require('fs');

function renderMixin(res, jadeTemplate, jadeLayout, data) {
    var o = {
        basedir: '/',
        filename: path.join(__dirname, '/../client/views/', jadeTemplate)
    };

    var contents = fs.readFileSync(__dirname + '/../client/views/' + jadeTemplate, 'utf-8');

    if (jadeLayout) {
        contents = 'extends ' + jadeLayout + '\n' + contents;
    }

    var compiled = jade.compile(contents, o);
    compiled = compiled(data || {});

    o.filename = path.join(__dirname, '/../client/www/view-partial/store-index.html');
    res.send(ejs.render(compiled, res.locals, o));
}

module.exports = router;