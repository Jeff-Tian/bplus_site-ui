(function (exports) {
    exports.MobileIndexCtrl = function ($scope, $stateParams, $state, $rootScope, msgBus, queryParser) {
        msgBus.onMsg(msgBus.events.viewContent.loaded, $scope, function (event, viewConfig) {
            if ($state.current.name === 'home' && $scope.$parent) {
                $scope.$parent.menuHref = '#/menu';
            }
        });

        var continueAction = queryParser.get('continue');
        window.alert(continueAction);
        if (continueAction) {
            console.log(continueAction);
            var paymentMethod = queryParser.get('payment_method');
            console.log('paymentmethod = ' + paymentMethod);
            $state.go(continueAction, {paymentMethod: paymentMethod});
        }
    };

    exports.MobileIndexCtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'msgBus', 'queryParser'];
})(angular.bplus = angular.bplus || {});