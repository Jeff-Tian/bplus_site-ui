(function () {
    var bplusServiceParams = (typeof require === "function") ? require("./config_bplusService") : {};
    var config = {
        sms: {
            host: 'qa.service.hcd.com',
            port: '10002',
            code: "BP_S1",
            enabled: true
        },
        mail: {
            host: 'qa.service.hcd.com',
            port: '10002',
            code: 'BP_M1',
            verificationCode: 'BP_M2'
        },
        captcha: {
            host: 'captcha.service.hcdlearning.com',
            port: '10001'
        },
        captchaInternal: {
            host: 'service.hcdlearning.com',
            port: '10001'
        },
        sso: {
            host: 'qa.service.hcd.com',
            port: '10086'
        },
        bplusService: {
            host: 'qa.service.hcd.com',
            port: '12345'
        },
        wechat: {
            host: 'qa.service.hcd.com',
            port: '10101'
        },
        "bplusServiceParams": bplusServiceParams,
        "logger": {
            "levels": {
                "[all]": "DEBUG"
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
        port: 12000
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = config;
    } else if (typeof angular !== 'undefined') {
        angular.bplus = angular.bplus || {};
        angular.bplus.config = config;
    }
})();