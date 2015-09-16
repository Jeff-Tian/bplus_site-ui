// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var i18n = require('i18n');
var localeHelper = require('./locales/localeHelper.js');
var Logger = require('logger');
var pack = require('./package.json');
var config = require('./config');
var logger = (Logger.init(config.logger), Logger(pack.name + pack.version));

var supportedLocales = localeHelper.supportedLocales;
i18n.configure({
    locales: supportedLocales,
    directory: __dirname + '/locales',
    updateFiles: false
});

// Node.js template engine
var ejs = require('ejs');

server
    .use(Logger.express("auto"))
    .use(function (req, res, next) {
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
    })
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

server.use('/config.js', express.static(__dirname + '/config/config_' + (process.env.NODE_ENV || 'dev') + '.js'));
server.use('/translation/localeHelper.js', express.static(__dirname + '/locales/localeHelper.js'));
server.use('/translation', localeHelper.serveTranslations);

// Customize client file path
server.set('views', __dirname + '/client/www');
server.use(express.static(__dirname + '/client/www'));
supportedLocales.map(function (l) {
    server.use('/' + l, express.static(__dirname + '/client/www'));
});

server.use('/service-proxy', require('./serviceProxy'));

// Page route define
server.get(localeHelper.regexPath('/index'), function (req, res) {
    res.render('index');
});
server.get(localeHelper.regexPath('/game'), function (req, res) {
    res.render('game');
});
server.get(localeHelper.regexPath('/opportunity'), function (req, res) {
    res.render('opportunity');
});
server.get('/data', require('./client/www/api/data.js').getData);

server.get(localeHelper.regexPath('/signin'), function (req, res) {
    res.render('sign-in');
});

server.get(localeHelper.regexPath('/reset-password-by-email'), function (req, res) {
    res.render('reset-password-by-email');
});

server.get(localeHelper.regexPath('/reset-password'), function (req, res) {
    res.render('reset-password');
});

server.get(localeHelper.regexPath('/set-password'), function (req, res) {
    res.render('set-password');
});

server.get(localeHelper.regexPath('/sign-up-from'), function (req, res) {
    res.render('sign-up-from');
});

server.get(localeHelper.regexPath('/personal-history'), function (req, res) {
    res.render('personal-history');
});

server.get(localeHelper.regexPath('/profile'), function (req, res) {
    res.render('profile');
});

function logErrors(err, req, res, next) {
    req.logger.error(err);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'Something blew up!'});
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