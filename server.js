// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var i18n = require('i18n');

i18n.configure({
    locales: ['en', 'zh'],
    directory: __dirname + '/locales'
});

function regexPath(p) {
    return new RegExp('(?:/(en|zh))?' + p, 'i');
}

// Node.js template engine
var ejs = require('ejs');

server.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));

// Set the view engine to ejs, but specify file type with ".html"
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');

server.use('/', require('./serviceProxy/membership.js').setSignedInUser);

server.get('/', function (req, res) {
    res.render('index');
});

server.use('/config.js', express.static(__dirname + '/config/config_dev.js'));

// Customize client file path
server.set('views', __dirname + '/client/www');
server.use(express.static(__dirname + '/client/www'));
server.use('/en', express.static(__dirname + '/client/www'));
server.use('/zh', express.static(__dirname + '/client/www'));

server.use(i18n.init);

server.all('*', function (req, res, next) {
    var l = /^\/(en|zh)/i;
    if (l.test(req.url)) {
        var a = l.exec(req.url);
        var local = a[1];
        i18n.setLocale(local);
        res.setLocale(local);
    } else {
        i18n.setLocale('zh');
        res.setLocale('zh');
    }

    next();
});

server.get(/(?:\/(en|zh))?\/test/i, function (req, res) {
    res.send(i18n.__('Hello'));
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
server.get('/register', function (req, res) {
    res.render('register');
});
server.get('/data', require('./client/www/api/data.js').getData);

server.get(regexPath('/signin'), function (req, res) {
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