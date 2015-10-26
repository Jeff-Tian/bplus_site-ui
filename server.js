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

function renderIndex(req, res, next) {
    renderOrRedirect(req, res, 'index');
}

function renderTemplate(name) {
    return function (req, res, next) {
        res.render(name);
    };
}

function renderOrRedirect(req, res, template) {
    if (!isFromMobile(req)) {
        res.render(template);
    } else {
        console.log('request from mobile');
        try {
            var stats = fs.lstatSync(staticFolder + '/mobile/' + template + '.html');
            if (stats.isFile()) {
                var redirectTo = '/m/' + template;
                var query = urlParser.parse(req.url).query;
                res.redirect(query ? redirectTo + '?' + query : redirectTo);
            } else {
                res.render(template);
            }
        } catch (e) {
            res.render(template);
        }
    }
}
function mapRoute2Template(url, template, pipes) {
    if (typeof template !== 'string') {
        pipes = template;
        template = url;

        if (template[0] === '/') {
            template = template.substr(1);
        }
    }

    pipes = pipes || [];
    pipes.push(function (req, res, next) {
        renderOrRedirect(req, res, template);
    });

    var args = [localeHelper.regexPath(url)].concat(pipes);

    server.get.apply(server, args);
}

function isFromMobile(req) {
    return mobileDetector.isFromMobile(req.headers['user-agent']);
}

server.get('/', renderIndex);
supportedLocales.map(function (l) {
    server.get('/' + l, renderIndex);
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
    res.setHeader("Content-Type", "text/javascript; charset=utf-8");
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
server.use(localeHelper.regexPath('/m'), require('./mobile'));
server.use(localeHelper.regexPath('/m'), express.static(staticFolder));

// Page route define

mapRoute2Template('/index');
mapRoute2Template('/game');
mapRoute2Template('/study');
mapRoute2Template('/contractus');
mapRoute2Template('/aboutus');
mapRoute2Template('/school');
mapRoute2Template('/statement');
mapRoute2Template('/opportunity');
server.get('/data', require('./client/www/api/data.js').getData);
mapRoute2Template('/sign-in');
mapRoute2Template('/signin', 'sign-in');
mapRoute2Template('/reset-password-by-email');
mapRoute2Template('/reset-password');
mapRoute2Template('/set-password');
server.get(localeHelper.regexPath('/sign-up-from'), membership.ensureAuthenticated, renderTemplate('sign-up-from'));
mapRoute2Template('/personal-history', [membership.ensureAuthenticated]);
server.get(localeHelper.regexPath('/profile'), membership.ensureAuthenticated, renderTemplate('profile'));
mapRoute2Template('/map');
server.get(localeHelper.regexPath('/account-setting'), membership.ensureAuthenticated, renderTemplate('account-setting'));
server.get(localeHelper.regexPath('/email-verify'), require('./email-verify.js'));

server.use('/healthcheck', function (req, res, next) {
    res.json({
        everything: 'is ok',
        time: new Date()
    });
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