angular.bplus = angular.bplus || {};
angular.bplus.config = angular.bplus.config || {};
angular.bplus.config.featureSwitcher = {
    enableWechat: true
};

angular.module('trackingModule', [])
    .factory('url', [function () {
        return {
            parse: function () {
                return ''
            }
        };
    }])
    .factory('tracking', [function () {
        return {
            send: function () {
            }
        };
    }])
;