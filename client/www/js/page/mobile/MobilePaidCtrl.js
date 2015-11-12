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
                    $state.go('paid', angular.extend({}, $stateParams, {redemptionCode: $scope.generatedCode}));
                }
            }
        }

        gotRedemptionCode();

        msgBus.onMemberLoaded($scope, function () {
            if ($scope.paidUser.member_id === $scope.memberInfo.member_id) {
                $scope.currentUserIsMe = true;

                if ($state.current.name === 'paid') {
                    service.post($scope.serviceUrls.checkNationalGame2015OrderPayment)
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
        });

        $rootScope.pageTitle = '火遍各大高校的商赛，快来拿免费门票!';
        $rootScope.pageDescription = '限额3名的Bridge+商战模拟游戏大赛免费入场票，再晚就没了！';

        $(document).attr('title', $rootScope.pageTitle);
    };

    exports.MobilePaidCtrl.$inject = ['$scope', '$stateParams', '$state', 'service', 'msgBus', '$rootScope', 'DeviceHelper'];
})(angular.bplus = angular.bplus || {});