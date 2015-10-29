(function (exports) {
    exports.SelectPaymentMethodCtrl = function ($scope, service, FormValidation, $stateParams, $state, queryParser) {
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
            pay(alipaying, 'alipaymobile', '/service-proxy/payment/create-order/national-game-2015/by-alipay', $('.alipay-form'));
        };

        var wechatPaying = false;
        $scope.wechatPay = function () {
            pay(wechatPaying, 'wechat', '/service-proxy/payment/create-order/national-game-2015/by-wechat?openid=' + queryParser.get('openid') + '&returnUrl=' + encodeURIComponent(window.location.protocol + '//' + window.location.host + window.location.pathname + '?continue=continue-paying&payment_method=wechat'), $('.wechat-pay-form'));
        };

        function pay(payingFlag, paymentMethod, url, $form) {
            service.executePromiseAvoidDuplicate(payingFlag, function () {
                    return service
                        .post(url, {
                            payment: paymentMethod,
                            requestFrom: encodeURIComponent(window.location.href)
                        })
                        .then(function (result) {
                            window.alert(JSON.stringify(result));

                            if (/^true$/i.test(result.hasRight)) {
                                window.location.href = '#/paid';
                            } else {

                                if (paymentMethod === 'wechat') {
                                    var wechat_config = {
                                        config: {
                                            appId: result.wechat.appId,
                                            timestamp: result.config.timestamp,
                                            nonceStr: result.config.nonceStr,
                                            signature: result.config.signature
                                        },

                                        payment: {
                                            timestamp: result.wechat.timestamp,
                                            nonceStr: result.wechat.nonceStr,
                                            package: result.wechat.package,
                                            signType: result.wechat.signType,
                                            paySign: result.wechat.paySign
                                        }
                                    };

                                    wechat_config.config.jsApiList = ['checkJsApi', 'chooseWXPay'];
                                    wechat_config.payment.success = function (res) {
                                        if (res.errMsg === 'chooseWXPay:ok') {
                                            window.alert('支付成功!');

                                            window.location.href = '#/paid';
                                        } else {
                                            window.alert('支付失败!');
                                        }
                                    };
                                    wechat_config.payment.cancel = function (res) {
                                        window.alert('支付取消！');
                                    };

                                    var wechat = {
                                        config: function () {
                                        },
                                        ready: function () {
                                        },
                                        checkJsApi: function () {
                                        },
                                        chooseWXPay: function () {
                                        }
                                    };

                                    if (typeof window.wx !== 'undefined') {
                                        wechat = window.wx;
                                    }

                                    wechat.config(wechat_config.config);
                                    wechat.ready(function () {
                                        wechat.checkJsApi({
                                            jsApiList: ['chooseWXPay'],
                                            success: function (res) {
                                                wechat.chooseWXPay(wechat_config.payment);
                                            }
                                        });
                                    });
                                } else {
                                    window.location.href = '//' + angular.bplus.config.payment.host + ':' + angular.bplus.config.payment.port + '/service/payment/' + paymentMethod + '/pay?orderId=' + result.orderId + '&returnUrl=' + encodeURIComponent(window.location.href + '/' + paymentMethod);
                                }
                            }
                        })
                        .catch(FormValidation.delegateHandleFormError($form))
                        ;
                }
            )
            ;
        }

        if ($state.current.name === 'continue-paying') {
            if ($stateParams.paymentMethod === 'wechat') {
                $scope.wechatPay();
            }
        }

        if ($stateParams.paidBy === 'alipay' || $stateParams.paidBy === 'alipaymobile') {
            $scope.alipay();
        }

        if ($stateParams.paidBy === 'wechat') {
            $scope.wechatPay();
        }
    };

    exports.SelectPaymentMethodCtrl.$inject = ['$scope', 'service', 'FormValidation', '$stateParams', '$state', 'queryParser'];
})
(angular.bplus = angular.bplus || {});