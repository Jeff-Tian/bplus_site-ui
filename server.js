// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var i18n = require('i18n');
var localeHelper = require('./locales/localeHelper.js');

var supportedLocales = localeHelper.supportedLocales;
i18n.configure({
    locales: supportedLocales,
    directory: __dirname + '/locales'
});

// Node.js template engine
var ejs = require('ejs');

server.use(bodyParser.json())
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

server.use('/config.js', express.static(__dirname + '/config/config_dev.js'));

// Customize client file path
server.set('views', __dirname + '/client/www');
server.use(express.static(__dirname + '/client/www'));
supportedLocales.map(function (l) {
    server.use('/' + l, express.static(__dirname + '/client/www'));
});

server.use('/service-proxy', require('./serviceProxy'));

// Page route define
server.get('/index', function (req, res) {
    res.render('index');
});
server.get('/game', function (req, res) {
    res.render('game');
});
server.get('/opportunity', function (req, res) {
    res.render('opportunity');
});
server.get('/data', require('./client/www/api/data.js').getData);

server.get(localeHelper.regexPath('/signin'), function (req, res) {
    res.render('sign-in');
});

server.get('/reset-password', function (req, res) {
    res.render('reset-password');
});

server.get('/reset-password-by-email', function (req, res) {
    res.render('reset-password-by-email');
});

server.get('/set-password', function (req, res) {
    res.render('set-password');
});

server.get('/sign-up-from', function (req, res) {
    res.render('sign-up-from');
});

server.get('/personal-history', function (req, res) {
    res.render('personal-history');
});

// Host & Port
var port = process.env.PORT || 8000;
server.listen(port, function () {
    console.log(port + ' is for Bridge+ ');
});