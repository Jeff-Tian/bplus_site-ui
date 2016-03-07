// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();
var config = require('./config');
console.log(config);
// Host & Port
var port = process.env.PORT || config.corpport;
server.listen(port, function () {
    console.log(port + ' is for Bridge+ Corporation');
});