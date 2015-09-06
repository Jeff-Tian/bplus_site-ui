// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();
var bodyParser = require('body-parser');

// Node.js template engine
var ejs = require('ejs');

server.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));

// Set the view engine to ejs, but specify file type with ".html"
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');

server.get('/', function (req, res) {
    res.render('index');
});

// Customize client file path
server.set('views', __dirname + '/client/www');
server.use(express.static(__dirname + '/client/www'));
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

server.get('/signin', function (req, res) {
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
server.listen(8000, function () {
    console.log('8000 is for Bridge+ ');
});