var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var i18n = require('i18n');
var localeHelper = require('./locales/localeHelper.js');
var Logger = require('logger');
var config = require('./config');
var logger = {
    info: function () {
    },
    error: function () {
    }
};
var mobileDetector = require('./mobile/mobileDetector');
var urlParser = require('url');
var fs = require('fs');

var supportedLocales = localeHelper.supportedLocales;
i18n.configure({
    locales: supportedLocales,
    directory: __dirname + '/locales',
    updateFiles: false
});

// Node.js template engine
var ejs = require('ejs');

function setLogger(req, res, next) {
    function dualLogError(o) {
        logger.error(o);
        console.error(o);
    }

    function dualLog(o) {
        logger.info(o);
        console.log(o);
    }

    req.logger = logger;
    req.dualLogError = dualLogError;
    req.dualLog = dualLog;

    next();
}

function setCDN(req, res, next) {
    res.locals.cdn = config.cdn;

    next();
}

function setFeatureSwitcher(req, res, next) {
    res.locals.featureSwitcher = config.featureSwitcher;
    next();
}

function setConfig(req, res, next) {
    res.locals.config = config;
    next();
}

function setDeviceHelper(req, res, next) {
    var ua = req.headers['user-agent'];

    res.locals.device = {
        isFromMobile: mobileDetector.isFromMobile(ua),
        isFromWechatBrowser: mobileDetector.isFromWechatBrowser(ua),
        isFromAndroid: mobileDetector.isFromAndroid(ua)
    };

    next();
}

function getMode() {
    return process.env.NODE_ENV || 'dev';
}

function setMode(req, res, next) {
    res.locals.dev_mode = (getMode() === 'dev');

    next();
}

server
    .use(Logger.express("auto"))
    .use(setLogger)
    .use(setCDN)
    .use(setFeatureSwitcher)
    .use(setConfig)
    .use(setDeviceHelper)
    .use(setMode)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));

// Set the view engine to ejs, but specify file type with ".html"
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');

server.use(i18n.init);

server.all('*', localeHelper.setLocale, localeHelper.setLocalVars);

server.use('/', require('./serviceProxy/membership.js').setSignedInUser);

server.use(require('./routes/corp.js'));

var staticFolder = __dirname + (getMode() === 'dev' ? '/client/www' : '/client/dist');
var viewFolder = __dirname + '/client/views';

var staticSetting = {
    etag: true,
    lastModified: true,
    maxAge: 1000 * 3600 * 24 * 30,
    setHeaders: function (res, path) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
};

function filterConfig(config) {
    var filtered = {};

    filtered.captcha = config.captcha;
    filtered.payment = config.payment.public;
    filtered.cdn = config.cdn;
    filtered.featureSwitcher = config.featureSwitcher;
    filtered.service_upload = config.service_upload;
    filtered.trackingUrl = config.trackingUrl;
    filtered.serviceUrls = config.serviceUrls;
    filtered.competitions = config.competitions;
    filtered.mode = getMode();
    filtered.durableMessageSource = config.durableMessageSource;
    filtered.upload = config.upload.public;

    return filtered;
}
server.use(/\/config\.js/, function (req, res, next) {
    var filteredConfig = JSON.stringify(filterConfig(config));

    res.setHeader("Content-Type", "text/javascript; charset=utf-8");
    res.send('if (typeof angular !== "undefined") {angular.bplus = angular.bplus || {}; angular.bplus.config = ' + filteredConfig + '; } angular.module("bplusConfigModule", []).run(["$rootScope", function($rootScope){$rootScope.config = ' + filteredConfig + '; }]);');
});

if (getMode() === 'dev') {
    server.use('/translation/localeHelper.js', express.static(__dirname + '/locales/localeHelper.js', staticSetting));
} else {
    server.use('/translation/localeHelper.js', express.static(__dirname + '/client/dist/translation/localeHelper.js', staticSetting));
}

server.use('/translation', localeHelper.serveTranslations);

// Customize client file path
server.set('views', [viewFolder, staticFolder]);

function setupStaticResources() {
    var staticServer = express.static(staticFolder, staticSetting);

    server.use(staticServer);
    // supportedLocales.concat(subApps).map(function (l) {
    //     server.use('/' + l, staticServer);
    // });
}

setupStaticResources();

server.use('/service-proxy', require('./serviceProxy'));
server.use('/corp-service-proxy', require('./serviceProxy/corp'));

//Server status check api
server.use('/healthcheck', function (req, res, next) {
    res.json({
        everything: 'is ok',
        time: new Date()
    });
});

server.get('/test', function (req, res, next) {
    res.send(req.__('Hello'));
});

server.get('/is_qa', function (req, res) {
    res.send('is_qa = ' + process.env.IS_QA);
});

server.get('/run_from', function (req, res) {
    res.send('run_form = ' + process.env.RUN_FROM);
});

server.get('/locale', function (req, res, next) {
    res.send(req.getLocale());
});

function logErrors(err, req, res, next) {
    req.logger.error(err);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        req.dualLogError(err);
        res.status(500).send({isSuccess: false, code: '500', message: 'Something blew up!'});
    } else {
        next(err);
    }
}

var mixedViewEngine = require('./routes/mixedViewEngine.js');

function errorHandler(err, req, res, next) {
    res.locals.title = '出错啦 - Bridge+';
    req.dualLogError(err);
    res.status(500);
    mixedViewEngine.render(res, 'corp/error.jade', 'layout.jade', res.locals);
}

server.use('*', function (req, res) {
    res.locals.title = '找不到页面 - Bridge+';
    req.dualLogError('404 Error met for "' + (req.headers['origin'] + req.originalUrl) + '". The referer is "' + req.headers['referer'] + '".');

    res.status(404);
    mixedViewEngine.render(res, 'corp/404.jade', 'layout.jade', res.locals);
});

server.use(logErrors);
server.use(clientErrorHandler);
server.use(errorHandler);

// Host & Port
var port = process.env.PORT || config.corpport;
server.listen(port, function () {
    console.log(port + ' is for Bridge+ Corporation');
});