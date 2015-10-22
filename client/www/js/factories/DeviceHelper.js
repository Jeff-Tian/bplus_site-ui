(function (exports) {
    function getUserAgent() {
        return window.navigator.userAgent || window.navigator.vender || window.opera;
    }

    exports.DeviceHelper = function () {
        return {
            isInWechatBrowser: function () {
                return /MicroMessenger/i.test(getUserAgent());
            },

            isMobile: function () {
                return /mobile/i.test(getUserAgent());
            },

            getCurrentUrlWithoutQueryStringNorHash: function () {
                return window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
        };
    };

    exports.DeviceHelper.$inject = [];
})(angular.bplus = angular.bplus || {});