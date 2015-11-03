(function (exports) {
    exports.MobilePaidCtrl = function ($scope, $stateParams, $state, service) {
        function askForPay() {
            $state.go('select-payment-method');
        }

        $scope.gameLink = window.location.protocol + '//' + window.location.host + '/m/national';

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
    };

    exports.MobilePaidCtrl.$inject = ['$scope', '$stateParams', '$state', 'service'];
})(angular.bplus = angular.bplus || {});