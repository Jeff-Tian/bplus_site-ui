var corp = require('express').Router();
var fs = require('fs');
var path = require('path');
var mixedViewEngine = require('./mixedViewEngine');
var config = require('../config/index');
var localeHelper = require('../locales/localeHelper.js');
var membership = require('../serviceProxy/membership.js');

function getRenderer(title, target, ignoreLayout) {
    var jadeLayout = ignoreLayout === true ? null : "layout.jade";
    return function (req, res, next) {
        res.locals.title = title + ' -- Bridge+';
        res.locals.cdnify = function (url) {
            if (url[0] === '/') {
                url = url.substr(1);
            }

            return config.cdn.normal + url + '?' + config.cdn.version;
        };
        mixedViewEngine.render(res, 'corp/' + target + '.jade', jadeLayout, res.locals);
    };
}

function routerFactory(name, title, pipes, ignoreLayout) {
    var target = name;

    if (target === '') {
        target = 'index';
    }

    var args = [localeHelper.localePath('/' + name)];

    if (pipes) {
        args = args.concat(pipes);
    }

    args = args.concat([getRenderer(title, target, ignoreLayout)]);

    corp.get.apply(corp, args);
}

routerFactory("", '企业首页');
routerFactory("register", '企业注册', membership.ensureAuthenticated);
routerFactory("edit", '修改企业资料');
//CV
routerFactory("cv", '简历管理');
routerFactory("printCV", '简历打印', null, true);
//Find
routerFactory("find", '找人才');
//Setting
routerFactory("setting", '账户管理');
routerFactory('about-us', '关于我们');

mixedViewEngine
    .renderEJS(corp, '/reset-password-by-email')
    .renderEJS(corp, '/reset-password')
    .renderEJS(corp, '/set-password')
;

corp.get(localeHelper.localePath('/sign-in'), getRenderer('企业登录 - Bridge+', 'index'));

corp.get(localeHelper.localePath('/long'), function (req, res, next) {

});

module.exports = corp;