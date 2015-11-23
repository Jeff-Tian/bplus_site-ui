(function (exports) {
    exports.MobilePaidCtrl = function ($scope, $stateParams, $state, service, msgBus, $rootScope, DeviceHelper) {
        function askForPay() {
            $state.go('select-payment-method');
        }

        $scope.gameLink = window.location.protocol + '//' + window.location.host + '/m/national';

        $scope.paidUser = {
            member_id: $stateParams.who,
            displayName: $stateParams.displayName
        };

        $scope.generatedCode = $stateParams.redemptionCode || '';

        function gotRedemptionCode() {
            if ($scope.generatedCode !== '') {
                DeviceHelper.setCookie('redemption_code', $scope.generatedCode);
            } else {
                $scope.generatedCode = DeviceHelper.getCookie('redemption_code');

                if ($scope.generatedCode) {
                    // Got the code then refresh the page to let the url contains the redemption code
                    // to easy the sharing it outward
                    var params = angular.extend({}, $stateParams, {redemptionCode: $scope.generatedCode});
                    if (!params.who || !params.displayName) {
                        msgBus.onMemberLoaded($scope, function () {
                            params.who = $scope.memberInfo.member_id;
                            params.displayName = $scope.memberInfo.displayName;

                            $state.go('paid', params, {reload: true});
                        });
                    } else {
                        $state.go('paid', params, {reload: true});
                    }
                }
            }
        }

        gotRedemptionCode();

        msgBus.onMemberLoaded($scope, function () {
            console.log('member loaded');
            if ($scope.paidUser.member_id === $scope.memberInfo.member_id) {
                $scope.currentUserIsMe = true;

                if ($state.current.name === 'paid') {
                    service.post(angular.bplus.config.serviceUrls.checkNationalGame2015OrderPayment)
                        .then(function (result) {
                            if (!/^true$/i.test(result.hasRight)) {
                                askForPay();
                            } else {
                                $scope.showPaid = true;
                            }
                        })
                        .catch(askForPay)
                    ;
                }
            } else {
                $scope.showPaid = true;
            }

            service.post('/service-proxy/member/get-setting', {
                member_id: $scope.paidUser.member_id,
                code: 'redemption-code'
            })
                .then(function (result) {
                    console.log('redemption code got:');
                    console.log(result);

                    if (result) {
                        $scope.generatedCode = result;

                        gotRedemptionCode();
                    }
                });


            if ($state.current.name === 'my-code') {
                if (!$scope.memberInfo || !$scope.memberInfo.member_id) {
                    window.location.href = 'sign-in?return_url=' + encodeURIComponent('/m/index#/my-code');
                } else {
                    service.post('/service-proxy/member/get-setting', {
                        member_id: $scope.memberInfo.member_id,
                        code: 'redemption-code'
                    }).then(function (result) {
                        $state.go('paid', {
                            who: $scope.memberInfo.member_id,
                            displayName: $scope.memberInfo.displayName,
                            redemptionCode: result
                        }, {reload: true});
                    }).catch(function () {
                        $state.go('paid', {
                            who: $scope.memberInfo.member_id,
                            displayName: $scope.memberInfo.displayName
                        }, {reload: true});
                    });
                }
            }
        });

        $rootScope.pageTitle = '火遍各大高校的商赛，快来拿免费门票!';
        $rootScope.pageDescription = '限额3名的Bridge+商战模拟游戏大赛免费入场票，再晚就没了！';

        $(document).attr('title', $rootScope.pageTitle);
    };

    exports.MobilePaidCtrl.$inject = ['$scope', '$stateParams', '$state', 'service', 'msgBus', '$rootScope', 'DeviceHelper'];
})(angular.bplus = angular.bplus || {});