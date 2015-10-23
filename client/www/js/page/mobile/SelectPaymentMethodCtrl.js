(function (exports) {
    exports.SelectPaymentMethodCtrl = function ($scope, service, FormValidation) {
        $scope.payData = {
            redemptionCode: ''
        };

        $scope.buyWithRedemptionCode = function () {
            var buying = false;

            service.executePromiseAvoidDuplicate(buying, function () {
                return service
                    .post('/service-proxy/commerce/create-order/by-redemption-code', {
                        redemptionCode: $scope.payData.redemptionCode
                    })
                    .catch(FormValidation.delegateHandleFormError($('.redemption-form')))
                    ;
            });
        };
    };

    exports.SelectPaymentMethodCtrl.$inject = ['$scope', 'service', 'FormValidation'];
})(angular.bplus = angular.bplus || {});