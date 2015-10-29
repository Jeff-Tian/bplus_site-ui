(function (exports) {
    exports.SelectPaymentMethodCtrl = function ($scope, service, FormValidation, $stateParams) {
        $scope.payData = {
            redemptionCode: ''
        };

        var buying = false;
        $scope.buyWithRedemptionCode = function () {
            service.executePromiseAvoidDuplicate(buying, function () {
                return service
                    .post('/service-proxy/commerce/create-order/national-game-2015/by-redemption-code', {
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
            pay(alipaying, 'alipay', $('.alipay-form'));
        };

        var wechatPaying = false;
        $scope.wechatPay = function () {
            pay(wechatPaying, 'wechat', $('.wechat-pay-form'));
        };

        function pay(payingFlag, paymentMethod, $form) {
            service.executePromiseAvoidDuplicate(payingFlag, function () {
                return service
                    .post('/service-proxy/payment/create-order/national-game-2015/by-payment', {
                        payment: paymentMethod
                    })
                    .then(function (result) {
                        if (/^true$/i.test(result.hasRight)) {
                            window.location.href = '#/paid';
                        } else {
                            window.location.href = '//' + angular.bplus.config.payment.host + ':' + angular.bplus.config.payment.port + '/service/payment/' + paymentMethod + '/pay?orderId=' + result.orderId + '&returnUrl=' + encodeURIComponent(window.location.href + '/' + paymentMethod);
                        }
                    })
                    .catch(FormValidation.delegateHandleFormError($form))
                    ;
            });
        }

        if ($stateParams.paidBy === 'alipay') {
            $scope.alipay();
        }

        if ($stateParams.paidBy === 'wechat') {
            $scope.wechatPay();
        }
    };

    exports.SelectPaymentMethodCtrl.$inject = ['$scope', 'service', 'FormValidation', '$stateParams'];
})(angular.bplus = angular.bplus || {});