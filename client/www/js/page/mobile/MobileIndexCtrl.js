(function (exports) {
    exports.MobileIndexCtrl = function ($scope, $stateParams, $state, $rootScope, msgBus) {
        msgBus.onMsg('$viewContentLoaded', $scope, function (event, viewConfig) {
            if ($state.current.name === 'home' && $scope.$parent) {
                $scope.$parent.menuHref = '#/menu';
            }

            console.log($state.current.name);
        });
    };

    exports.MobileIndexCtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'msgBus'];
})(angular.bplus = angular.bplus || {});