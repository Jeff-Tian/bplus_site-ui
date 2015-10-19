var path = require('path');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config_prd.json'), 'utf-8'));

if (process.env.DATACENTER) {
    config.captcha.host = process.env.DATACENTER + '-' + config.captcha.host;

    if (/^SZ$/i.test(process.env.DATACENTER)) {
        config.cdn.normal = '//cdn2.bridgeplus.cn/';
    }
}
config.bplusServiceParams = require("./config_bplusService");
config.cdn.version = config.version + "_" + config.date;

module.exports = config;