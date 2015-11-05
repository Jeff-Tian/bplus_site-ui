(function (exports) {
    exports.SelectInterestCtrl = function ($scope, service, FormValidation, $stateParams, $state, queryParser, msgBus, WechatWrapper) {
        $('.ui.checkbox').checkbox();
    };

    exports.SelectInterestCtrl.$inject = ['$scope', 'service', 'FormValidation', '$stateParams', '$state', 'queryParser', 'msgBus', 'WechatWrapper'];
})
(angular.bplus = angular.bplus || {});