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
                            window.location.href = '//' + angular.bplus.config.payment.host + ':' + angular.bplus.config.payment.port + '/service/payment/' + paymentMethod + '/pay?orderId=' + result.orderId + '&returnUrl=' + encodeURIComponent(window.location.href + '/alipay');
                        }
                    })
                    .catch(FormValidation.delegateHandleFormError($('.alipay-form')))
                    ;
            });
        };

        var wechatPaying = false;
        $scope.wechatPay = function () {
            var paymentMethod = 'wechat';

            service.executePromiseAvoidDuplicate(wechatPaying, function () {
                return service
                    .post('/service-proxy/payment/create-order/national-game-2015/by-wechat', {
                        payment: paymentMethod
                    })
                    .then(function (result) {
                        if (/^true$/i.test(result.hasRight)) {
                            window.location.href = '#/paid';
                        } else {
                            window.location.href = '//' + angular.bplus.config.payment.host + ':' + angular.bplus.config.payment.port + '/service/payment/' + paymentMethod + '/pay?orderId=' + result.orderId + '&returnUrl=' + encodeURIComponent(window.location.href + '/wechat');
                        }
                    })
                    .catch(FormValidation.delegateHandleFormError($('.wechat-pay-form')))
                    ;
            });
        };

        if ($stateParams.paidBy === 'alipay') {
            $scope.alipay();
        }

        if ($stateParams.paidBy === 'wechat') {
            $scope.wechatPay();
        }
    };

    exports.SelectPaymentMethodCtrl.$inject = ['$scope', 'service', 'FormValidation', '$stateParams'];
})(angular.bplus = angular.bplus || {});