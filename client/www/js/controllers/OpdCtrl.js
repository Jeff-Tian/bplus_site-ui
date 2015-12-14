(function (exports) {
    exports.OpdCtrl = function ($scope, PipeCacheService)  {

        console.log("hello");
    };

    exports.OpdCtrl.$inject = ['$scope', 'PipeCacheService', 'service', 'MessageStore', 'msgBus', '$translate', '$timeout', 'DeviceHelper', 'queryParser', 'WechatLogon', '$filter'];
})(angular.bplus = angular.bplus || {});