(function () {
    var config = {
        sms: {
            //host: 'uat.service.hcdlearning.com', //'10.20.32.61'
            host: '10.20.32.61',
            port: '10002',
            code: "BP_S1"
        },
        mail: {
            //host: 'uat.service.hcdlearning.com', //'10.20.32.61',
            host: '10.20.32.61',
            port: '10002',
            code: 'BP_M1'
        },
        captcha: {
            //host: 'uat.captcha.service.hcdlearning.com', //'10.20.32.51'
            host: '10.20.32.51',
            port: '10001'
        },
        sso: {
            //host: 'uat.service.hcdlearning.com', //'10.20.32.61'
            host: '10.20.32.61',
            port: '10086',
            applicationId: '2b33cf2c-e5dd-4e82-8687-d3fe099a3504'
        },
        profile: {
            //host: 'uat.service.hcd.com', //'10.20.32.61'
            host: 'uat.service.hcd.com',
            port: '12345',
            //should get it from login infomation.
            applicationId: 'ea9027f4-b448-4051-968c-648489a86d75'
        },
        "logger": {
            "levels": {
                "[all]": "DEBUG"
            },
            "appenders": [{
                "type": "console",
                "category": "log"
            }, {
                "type": "log4js_cassandra",
                "nodes": ["uat.cass01.server"],
                "username": "cassandra",
                "password": "HCDhcd@123",
                "keyspace": "logdb",
                "table": "log",
                "appName": "HCDGlobal"
            }]
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = config;
    } else if (typeof angular !== 'undefined') {
        angular.bplus = angular.bplus || {};
        angular.bplus.config = config;
    }
})();