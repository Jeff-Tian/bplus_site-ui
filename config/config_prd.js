var config = {
    sms: {
        host: 'qa.service.bridgeplus.cn',
        port: '10002',
        code: "BP_S1",
        enabled: true
    },
    mail: {
        host: 'qa.service.bridgeplus.cn',
        port: '10002',
        code: 'BP_M1',
        verificationCode: 'BP_M2'
    },
    captcha: {
        host: 'qa.service.bridgeplus.cn',
        port: '10001'
    },
    captchaInternal: {
        host: process.env.DATACENTER + '-captcha.service.bridgeplus.cn',
        port: '10001'
    },
    sso: {
        host: 'qa.service.bridgeplus.cn',
        port: '10086'
    },
    bplusService: {
        host: 'qa.service.bridgeplus.cn',
        port: '12345'
    },
    wechat: {
        host: 'uat.service.brigeplus.cn',
        port: '10101'
    },
    "bplusServiceParams": require("./config_bplusService"),
    "logger": {
        "levels": {
            "[all]": "ERROR"
        },
        "appenders": [{
            "type": "console"
        }, {
            "type": "log4js_cassandra",
            "nodes": ["live.cass01.server", "live.cass02.server"],
            "username": "cassandra",
            "password": "HCDhcd@123",
            "keyspace": "logdb",
            "table": "log",
            "appName": "BridgePlus"
        }]
    },
    applicationId: '2b33cf2c-e5dd-4e82-8687-d3fe099a3504',
    port: 12000,
    cdn: {
        normal: "//cdn.bridgeplus.cn/"
    }
};

module.exports = config;