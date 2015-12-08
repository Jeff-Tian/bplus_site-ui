(function (exports) {
    exports.OpdCtrl = function () {

        console.log("hello");
    };

    exports.OpdCtrl.$inject = ['$scope', 'service', 'MessageStore', 'msgBus', '$translate', '$timeout', 'DeviceHelper', 'queryParser', 'WechatLogon', '$filter'];
})(angular.bplus = angular.bplus || {});