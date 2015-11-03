var path = require('path');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config_prd.json'), 'utf-8'));

if (process.env.DATACENTER) {
    config.captcha.host = process.env.DATACENTER + '-' + config.captcha.host;
    config.payment.public.host = process.env.DATACENTER + '-' + config.payment.public.host;
}
config.bplusServiceParams = require("./config_bplusService");
config.cdn.version = config.version + "_" + config.date;
config.service_upload = "//" + config.upload.public.host + ":" + config.upload.public.port;

module.exports = config;