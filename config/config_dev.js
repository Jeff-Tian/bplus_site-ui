(function () {
    var config = {
        sms: {
            host: '10.20.32.61', //'uat.service.hcdlearning.com',
            port: '10002',
            code: "HCD_S1"
        },
        captcha: {
            host: '10.20.32.51', // 'uat.captcha.service.hcdlearning.com'
            port: '10001'
        },
        sso: {
            host: '10.20.32.61', // 'uat.service.hcdlearning.com'
            port: '10086',
            applicationId: '2b33cf2c-e5dd-4e82-8687-d3fe099a3504'
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = config;
    } else if (typeof angular !== 'undefined') {
        angular.bplus = angular.bplus || {};
        angular.bplus.config = config;
    }
})();