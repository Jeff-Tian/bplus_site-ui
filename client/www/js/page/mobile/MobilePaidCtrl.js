(function (exports) {
    exports.MobilePaidCtrl = function ($scope, $stateParams, $state, service, msgBus, $rootScope, WechatWrapper) {
        function getCookie(name) {
            if (document.cookie.length > 0) {
                var start = document.cookie.indexOf(name + '=');
                if (start >= 0) {
                    start += name.length + 1;
                    var end = document.cookie.indexOf(';', start);
                    if (end === -1) {
                        end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(start, end));
                }
            }

            return null;
        }

        function askForPay() {
            $state.go('select-payment-method');
        }

        $scope.gameLink = window.location.protocol + '//' + window.location.host + '/m/national';

        $scope.paidUser = {
            member_id: $stateParams.who,
            displayName: $stateParams.displayName
        };

        $scope.generatedCode = $stateParams.redemptionCode || '';

        if ($scope.generatedCode !== '') {
            document.cookie = 'redemption_code=' + $scope.generatedCode + ';path=/;';
        } else {
            $scope.generatedCode = getCookie('redemption_code');

            if ($scope.generatedCode) {
                $state.go('paid', angular.extend({}, $stateParams, {redemptionCode: $scope.generatedCode}));
            }
        }

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

        $rootScope.pageTitle = '火遍各大高校的商赛，快来拿免费门票!';
        $rootScope.pageDescription = '限额3名的Bridge+商战模拟游戏大赛免费入场票，再晚就没了！';

        $(document).attr('title', $rootScope.pageTitle);
    };

    exports.MobilePaidCtrl.$inject = ['$scope', '$stateParams', '$state', 'service', 'msgBus', '$rootScope', 'WechatWrapper'];
})(angular.bplus = angular.bplus || {});