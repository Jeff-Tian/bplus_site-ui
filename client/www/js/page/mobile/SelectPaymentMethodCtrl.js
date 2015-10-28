(function (exports) {
    exports.SelectPaymentMethodCtrl = function ($scope, service, FormValidation, $stateParams) {
        $scope.payData = {
            redemptionCode: ''
        };

        var buying = false;
        $scope.buyWithRedemptionCode = function () {
            service.executePromiseAvoidDuplicate(buying, function () {
                return service
                    .post('/service-proxy/commerce/create-order/by-redemption-code', {
                        redemptionCode: $scope.payData.redemptionCode
                    })
                    .then(function (result) {
                        window.location.href = $scope.localeUrl('/index#/payed');
                    })
                    .catch(FormValidation.delegateHandleFormError($('.redemption-form')))
                    ;
            });
        };

        var alipaying = false;
        $scope.alipay = function () {
            var paymentMethod = 'alipaymobile';

            service.executePromiseAvoidDuplicate(alipaying, function () {
                return service
                    .post('/service-proxy/payment/create-order/national-game-2015/by-alipay', {
                        payment: paymentMethod
                    })
                    .then(function (result) {
                        if (/^true$/i.test(result.hasRight)) {
                            // Already payed
                            window.location.href = '#/payed';
                        } else {
                            // Goto pay
                            // TODO: the returnUrl should contain info about if the payment is success
                            window.location.href = '//' + angular.bplus.config.payment.host + ':' + angular.bplus.config.payment.port + '/service/payment/' + paymentMethod + '/pay?orderId=' + result.orderId + '&returnUrl=' + encodeURIComponent(window.location.href + '/alipay');
                        }
                    })
                    .catch(FormValidation.delegateHandleFormError($('.alipay-form')))
                    ;
            });
        };
        
        if ($stateParams.payedBy === 'alipay' || $stateParams.payedBy === 'wechat') {
            $scope.alipay();
        }
    };

    exports.SelectPaymentMethodCtrl.$inject = ['$scope', 'service', 'FormValidation', '$stateParams'];
})(angular.bplus = angular.bplus || {});