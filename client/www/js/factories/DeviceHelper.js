(function (exports) {
    exports.DeviceHelper = function () {
        return {
            isInWechatBrowser: function () {
                return /MicroMessenger/i.test(window.navigator.userAgent || window.navigator.vender || window.opera);
            },

            getCurrentUrlWithoutQueryStringNorHash: function () {
                return window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
        };
    };

    exports.DeviceHelper.$inject = [];
})(angular.bplus = angular.bplus || {});