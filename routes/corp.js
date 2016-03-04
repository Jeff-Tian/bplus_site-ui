var corp = require('express')();
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var ejs = require('ejs');
var config = require('../config/index');

function filterConfig(config) {
    var filtered = {};

    filtered.serviceUrls = config.serviceUrls;
    filtered.sharedUIPath = '/bower/SHARED-UI/';
    filtered.cdn = config.cdn;
    filtered.payment = config.payment.public;
    filtered.onlineStoreMenuSource = config.onlineStoreMenuSource;

    return filtered;
}

corp.use(function (req, res, next) {
    //res.send('ok');
    next();
});

corp.get('/', function (req, res, next) {
    renderMixin(res, 'corp/index.jade', 'corp/layout.jade', {
        cdn: config.cdn
    });
});

corp.get('/my', function (req, res, next) {
    renderMixin(res, 'study-center.jade', 'study-center-layout.jade', {
        cdn: config.cdn
    });
});

function cdnify(url, cdn) {
    return cdn.normal + url + '?' + cdn.version;
}

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

module.exports = corp;