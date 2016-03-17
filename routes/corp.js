var corp = require('express').Router();
var fs = require('fs');
var path = require('path');
var mixedViewEngine = require('./mixedViewEngine');
var config = require('../config/index');

function routerFactory(name, title) {
    var target = name;

    if (target === '') {
        target = 'index';
    }

    corp.get('/' + name, function (req, res, next) {
        mixedViewEngine.render(res, 'corp/' + target + '.jade', 'layout.jade', {
            cdn: config.cdn,
            __: req.__,
            title: title + ' -- Bridge+'
        });
    });
}
//Index
routerFactory("", '企业首页');
//Regist
routerFactory("register", '企业注册');
//CV
routerFactory("cv", '简历管理');

mixedViewEngine
    .renderEJS(corp, '/reset-password-by-email')
    .renderEJS(corp, '/reset-password')
    .renderEJS(corp, './set-password')
;

module.exports = corp;