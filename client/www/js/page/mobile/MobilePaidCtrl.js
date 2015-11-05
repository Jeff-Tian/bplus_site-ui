(function (exports) {
    exports.MobilePaidCtrl = function ($scope, $stateParams, $state, service, msgBus, $rootScope, WechatWrapper) {
        function askForPay() {
            $state.go('select-payment-method');
        }

        $scope.gameLink = window.location.protocol + '//' + window.location.host + '/m/national';

        $scope.paidUser = {
            member_id: $stateParams.who,
            displayName: $stateParams.displayName
        };

        $scope.generatedCode = $stateParams.redemptionCode || '';

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
        });

        $rootScope.pageTitle = '报名 Bridge+ 全国大赛';
        $rootScope.pageDescription = '快来一起报名吧!';
    };

    exports.MobilePaidCtrl.$inject = ['$scope', '$stateParams', '$state', 'service', 'msgBus', '$rootScope', 'WechatWrapper'];
})(angular.bplus = angular.bplus || {});