var path = require('path');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config_prd.json'), 'utf-8'));

config.captcha.host = (process.env.DATACENTER ? process.env.DATACENTER + '-' : '') + config.captcha.host;
config.bplusServiceParams = require("./config_bplusService");
config.cdn.version = config.version;

module.exports = config;