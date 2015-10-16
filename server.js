// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var i18n = require('i18n');
var localeHelper = require('./locales/localeHelper.js');
var Logger = require('logger');
var pack = require('./package.json');
var config = require('./config');
var membership = require('./serviceProxy/membership.js');
var logger = (Logger.init(config.logger), Logger(pack.name + pack.version));

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

server
    .use(Logger.express("auto"))
    .use(setLogger)
    .use(setCDN)
    .use(setFeatureSwitcher)
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

server.get('/', function (req, res) {
    res.render('index');
});
supportedLocales.map(function (l) {
    server.get('/' + l, function (req, res) {
        res.render('index');
    });
});

var staticFolder = __dirname + ((process.env.NODE_ENV || 'dev') === 'dev' ? '/client/www' : '/client/dist');
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
    filtered.cdn = config.cdn;
    filtered.featureSwitcher = config.featureSwitcher;

    return filtered;
}

server.use('/config.js', function (req, res, next) {
    res.send('if (typeof angular !== "undefined") {angular.bplus = angular.bplus || {}; angular.bplus.config = ' + JSON.stringify(filterConfig(config)) + '; }');
});

if ((process.env.NODE_ENV || 'dev' ) === 'dev') {
    server.use('/translation/localeHelper.js', express.static(__dirname + '/locales/localeHelper.js', staticSetting));
} else {
    server.use('/translation/localeHelper.js', express.static(__dirname + '/client/dist/translation/localeHelper.js', staticSetting));
}

server.use('/translation', localeHelper.serveTranslations);

// Customize client file path
server.set('views', staticFolder);
server.use(express.static(staticFolder, staticSetting));
supportedLocales.map(function (l) {
    server.use('/' + l, express.static(staticFolder, staticSetting));
});

server.use('/service-proxy', require('./serviceProxy'));

// Page route define
function renderTemplate(name) {
    return function (req, res, next) {
        res.render(name);
    };
}

function mapRoute2Template(url, template) {
    if (!template) {
        template = url;

        if (template[0] === '/') {
            template = template.substr(1);
        }
    }

    server.get(localeHelper.regexPath(url), renderTemplate(template));
}

mapRoute2Template('/index');
mapRoute2Template('/game');
mapRoute2Template('/opportunity');
server.get('/data', require('./client/www/api/data.js').getData);
mapRoute2Template('/signin', 'sign-in');
mapRoute2Template('/reset-password-by-email');
mapRoute2Template('/reset-password');
mapRoute2Template('/set-password');
server.get(localeHelper.regexPath('/sign-up-from'), membership.ensureAuthenticated, renderTemplate('sign-up-from'));
server.get(localeHelper.regexPath('/personal-history'), membership.ensureAuthenticated, renderTemplate('personal-history'));
server.get(localeHelper.regexPath('/profile'), membership.ensureAuthenticated, renderTemplate('profile'));
mapRoute2Template('/map');
//mapRoute2Template('/account-setting');
server.get(localeHelper.regexPath('/account-setting'), membership.ensureAuthenticated, renderTemplate('account-setting'));

var proxy = require('./serviceProxy/proxy.js');
var sso = require('./config').sso;
server.get(localeHelper.regexPath('/email-verify'), function (req, res, next) {
    if (!req.query || !req.query.mailToken) {
        res.locals.result = 'MailTokenNotFound';
        res.render('email-verify');
    }

    proxy({
        host: sso.host,
        port: sso.port,
        path: '/member/mailValidation/validate',
        method: 'POST',
        dataMapper: function (d) {
            return {
                token: req.query.mailToken
            };
        },
        responseInterceptor: function (response, json) {
            if (typeof json.code !== 'undefined') {
                res.locals.result = 'service-' + json.code;
            } else if (json.isSuccess) {
                res.locals.result = 'EmailVerifiedSuccess';
            } else {
                res.locals.result = '发生未知错误';
            }

            res.render('email-verify');

            return true;
        }
    })(req, res, next);
});

server.use('/healthcheck', function (req, res, next) {
    res.json({
        everything: 'is ok',
        time: new Date()
    });
});

function logErrors(err, req, res, next) {
    req.logger.error(err);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        req.dualLogError(err);
        res.status(500).send({code: '500', message: 'Something blew up!'});
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    req.dualLogError(err);
    res.status(500).send('Something borke!');
    // TODO: prepare an error template
    //res.render('error', {error: err});
}

server.use(logErrors);
server.use(clientErrorHandler);
server.use(errorHandler);

// Host & Port
var port = process.env.PORT || config.port;
server.listen(port, function () {
    console.log(port + ' is for Bridge+ ');
});