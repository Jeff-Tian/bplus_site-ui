// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();

// Node.js template engine
var ejs = require('ejs');

// Set the view engine to ejs, but specify file type with ".html"
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');

// Customize client file path
server.set('views', __dirname + '/client/www');
server.use(express.static(__dirname + '/client/www'));

// Page route define
server.get('/index', function(req, res) {
    res.render('index');
});

// Host & Port
server.listen(8000);
console.log('8000 is for Bridge+');
