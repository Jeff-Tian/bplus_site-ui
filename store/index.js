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
    renderMixin(res, 'my.jade', 'mylayout.jade', {
        cdn: config.cdn
    });
});

router.get('/json/:json', function (req, res, next) {
    res.send(fs.readFileSync(__dirname + '/./' + req.params.json));
});

function cdnify(url, cdn) {
    return cdn.normal + url + '?' + cdn.version;
}

router.get('/offers', function (req, res, next) {
    renderMixin(res, 'offers.jade', 'offers-layout.jade', {
        cdn: config.cdn,
        title: '商城',
        paymentMethods: {
            pcAlipay: 'b_alipay'
        },
        horizontalMenus: [{
            text: '优惠组合',
            image: cdnify('img/online-store/icon_discount_red_30x30.png', res.locals.cdn),
            activeImage: cdnify('img/online-store/icon_discount_white_30x30.png', res.locals.cdn),
            state: 'offer-a',
            target: '#/offer-a'
            //}, {
            //    text: '复活赛－服务',
            //    image: cdnify('img/online-store/icon_resurgence_red_35x35.png', res.locals.cdn),
            //    activeImage: cdnify('img/online-store/icon_resurgence_white_35x35.png', res.locals.cdn),
            //    state: 'offer-b',
            //    target: '#/offer-b'
        }, {
            text: '激活码兑换',
            image: cdnify('img/online-store/icon_barcode_red_35x30.png', res.locals.cdn),
            activeImage: cdnify('img/online-store/icon_barcode_white_35x30.png', res.locals.cdn),
            state: 'offer-c',
            target: '#/offer-c'
        }]
    });
});

function renderMixin(res, jadeTemplate, jadeLayout, data) {
    var o = {
        basedir: '/',
        filename: path.join(__dirname, '/../client/views/', jadeTemplate)
    };

    var contents = fs.readFileSync(__dirname + '/../client/views/' + jadeTemplate, 'utf-8');
    contents = 'extends ' + res.locals.onlineStoreTemplate + jadeLayout + '\n' + contents;

    var compiled = jade.compile(contents, o);
    compiled = compiled(data || {});

    o.filename = path.join(__dirname, '/../client/www/view-partial/store-index.html');
    res.send(ejs.render(compiled, res.locals, o));
}

module.exports = router;