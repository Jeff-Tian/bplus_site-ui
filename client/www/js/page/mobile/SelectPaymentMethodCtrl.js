(function (exports) {
    exports.SelectPaymentMethodCtrl = function ($scope, service, FormValidation, $stateParams, $state, queryParser, msgBus, WechatWrapper) {

        function gotoPaid(result) {
            function gotoPaidInner() {
                $state.go('paid', {
                    who: $scope.memberInfo.member_id,
                    displayName: $scope.memberInfo.displayName,
                    redemptionCode: result && result.generatedRedemption ? (result.generatedRedemption.result || '') : ''
                });
            }

            msgBus.onMemberLoaded($scope, gotoPaidInner);
        }

        function gotoInterests(result) {
            function gotoInterestsInner() {
                $state.go('select-interest', {
                    who: $scope.memberInfo.member_id,
                    displayName: $scope.memberInfo.displayName,
                    redemptionCode: result && result.generatedRedemption ? (result.generatedRedemption.result || '') : ''
                });
            }

            msgBus.onMemberLoaded($scope, gotoInterestsInner);
        }

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
                        gotoInterests(result);
                    })
                    .catch(FormValidation.delegateHandleFormError($('.redemption-form')))
                    ;
            });
        };

        var alipaying = false;
        $scope.alipay = function () {
            pay(alipaying, 'alipaymobile', '/service-proxy/payment/create-order/national-game-2015/by-alipay', $('.alipay-form'));
        };

        $scope.pcAlipay = function () {
            pay(alipaying, 'alipay', '/service-proxy/payment/create-order/national-game-2015/by-alipay', $('.alipay-form'));
        };

        var wechatPaying = false;
        $scope.wechatPay = function () {
            pay(wechatPaying, 'wechat', '/service-proxy/payment/create-order/national-game-2015/by-wechat?openid=' + queryParser.get('openid') + '&returnUrl=' + encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m/' + '?continue=continue-paying&payment_method=wechat'), $('.wechat-pay-form'));
        };

        var invokingWechatPay = false;

        function wechatPaid() {
            invokingWechatPay = false;
            msgBus.hideLoading();
        }

        function pay(payingFlag, paymentMethod, url, $form) {
            if (invokingWechatPay) {
                return;
            }

            msgBus.showLoading();
            service.executePromiseAvoidDuplicate(payingFlag, function () {
                    return service
                        .post(url, {
                            payment: paymentMethod,
                            requestFrom: encodeURIComponent(window.location.href)
                        })
                        .then(function (result) {
                            if (/^true$/i.test(result.hasRight)) {
                                gotoInterests(result);
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
                                            timestamp: result.wechat.timeStamp,
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
                                            wechatPaid();
                                            //gotoPaid();
                                            window.location.reload();
                                        } else {
                                            window.alert('支付失败!');
                                            wechatPaid();
                                        }
                                    };
                                    wechat_config.payment.cancel = function (res) {
                                        window.alert('支付取消！');
                                        wechatPaid();
                                    };
                                    wechat_config.payment.fail = function (res) {
                                        wechatPaid();
                                    };

                                    var wechat = WechatWrapper;

                                    if (!invokingWechatPay) {
                                        invokingWechatPay = true;

                                        wechat.config(wechat_config.config);
                                        wechat.ready(function () {
                                            wechat.checkJsApi({
                                                jsApiList: ['chooseWXPay'],
                                                success: function (res) {
                                                    wechat.chooseWXPay(wechat_config.payment);
                                                }
                                            });
                                        });
                                    }
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

        if ($state.current.name === 'select-payment-method') {
            service.post('/service-proxy/payment/create-order/national-game-2015/check-has-right')
                .then(function (result) {
                    if (/^true$/i.test(result.hasRight)) {
                        // Don't generate redemption code
                        gotoPaid();
                    }
                });
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

        $scope.showGameDetailModal = function () {
            $('.b-game-detail.modal').modal('show');
        };
    };

    exports.SelectPaymentMethodCtrl.$inject = ['$scope', 'service', 'FormValidation', '$stateParams', '$state', 'queryParser', 'msgBus', 'WechatWrapper'];
})
(angular.bplus = angular.bplus || {});