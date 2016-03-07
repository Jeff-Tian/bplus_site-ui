// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();
var config = require('./config');
// Host & Port
var port = 12001 || process.env.PORT || config.port;
server.listen(port, function () {
    console.log(port + ' is for Bridge+ Corporation');
});