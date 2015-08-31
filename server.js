// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();

// Node.js template engine
var ejs = require('ejs');

// Set the view engine to ejs, but specify file type with ".html"
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');

server.get('/', function (req, res) {
    res.render('index');
});

// Customize client file path
server.set('views', __dirname + '/client/www');
server.use(express.static(__dirname + '/client/www'));

// Page route define
server.get('/index', function (req, res) {
    res.render('index');
});

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

// Host & Port
server.listen(8000);
console.log('8000 is for Bridge+');
