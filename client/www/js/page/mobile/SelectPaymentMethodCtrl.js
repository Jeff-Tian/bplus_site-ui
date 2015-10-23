(function (exports) {
    exports.SelectPaymentMethodCtrl = function ($scope, service) {
        $scope.payData = {
            redemptionCode: ''
        };

        $scope.buyWithRedemptionCode = function () {
            var buying = false;

            service.executePromiseAvoidDuplicate(buying, function () {
                return service
                    .post('/service-proxy/commerce/create-order/by-redemption-code', {
                        redemptionCode: $scope.payData.redemptionCode
                    })
                    .then()
                    .catch(function (ex) {
                        if (String(ex.code) === '401') {
                            window.location.href = $scope.localeUrl('/sign-in?return_url=' + encodeURIComponent(window.location.href) + '#/login');
                        }
                    });
            });
        };
    };

    exports.SelectPaymentMethodCtrl.$inject = ['$scope', 'service'];
})(angular.bplus = angular.bplus || {});