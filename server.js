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
        req.logger.error(o);
        console.error(o);
    }

    function dualLog(o) {
        req.logger.log(o);
        console.log(o);
    }

    req.logger = logger;
    req.dualLogError = dualLogError;
    req.dualLog = dualLog;

    next();
}

function shimGrunt(req, res, next) {
    res.locals.grunt = {
        file: {
            readJSON: function () {
                return 'x';
            }
        }
    };

    next();
}

function setCDN(req, res, next) {
    res.cdn = {};

    next();
}

server
    .use(Logger.express("auto"))
    .use(setLogger)
    .use(shimGrunt)
    .use(setCDN)
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

var viewFolder = __dirname + ((process.env.NODE_ENV || 'dev') === 'dev' ? '/client/www' : '/client/dist');

server.use('/config.js', express.static(__dirname + '/config/config_' + (process.env.NODE_ENV || 'dev') + '.js'));
server.use('/translation/localeHelper.js', express.static(__dirname + '/locales/localeHelper.js'));
server.use('/translation', localeHelper.serveTranslations);

// Customize client file path
server.set('views', viewFolder);
server.use(express.static(viewFolder));
supportedLocales.map(function (l) {
    server.use('/' + l, express.static(viewFolder));
});

server.use('/service-proxy', require('./serviceProxy'));

// Page route define
function renderTemplate(name) {
    return function (req, res, next) {
        res.render(name);
    }
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
mapRoute2Template('/sign-up-from');
server.get(localeHelper.regexPath('/personal-history'), membership.ensureAuthenticated, renderTemplate('personal-history'));
mapRoute2Template('/profile');
mapRoute2Template('/map');
//mapRoute2Template('/account-setting');
server.get(localeHelper.regexPath('/account-setting'), membership.ensureAuthenticated, renderTemplate('account-setting'));

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
        res.status(500).send({code: '', message: 'Something blew up!'});
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500).send('Something borke!');
    // TODO: prepare an error template
    //res.render('error', {error: err});
}

server.use(logErrors);
server.use(clientErrorHandler);
server.use(errorHandler);

// Host & Port
var port = process.env.PORT || 8000;
server.listen(port, function () {
    console.log(port + ' is for Bridge+ ');
});