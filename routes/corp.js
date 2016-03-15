var corp = require('express').Router();
var fs = require('fs');
var path = require('path');
var mixedViewEngine = require('./mixedViewEngine');
var config = require('../config/index');

function routerFactory(name, target) {
    if (!target) {
        target = name;
    }
    if (target === '') {
        target = 'index';
    }
    corp.get('/' + name, function (req, res, next) {
        mixedViewEngine.render(res, 'corp/' + target + '.jade', 'layout.jade', {
            cdn: config.cdn
        });
    });
}
//Index
routerFactory("");
//Regist
routerFactory("register");
//CV
routerFactory("cv");

mixedViewEngine
    .renderEJS(corp, '/reset-password-by-email')
    .renderEJS(corp, '/reset-password')
    .renderEJS(corp, './set-password')
;

module.exports = corp;