(function (exports) {
    exports.MobileMenuCtrl = function ($scope, $stateParams, $state, $rootScope, msgBus) {
        msgBus.onMsg('$viewContentLoaded', $scope,ove function (event, viewConfig) {
            if ($state.current.name === 'menu' && $scope.$parent) {
                $scope.$parent.menuHref = '#/home';
            }

            console.log($state.current.name);
        });
    };

    exports.MobileMenuCtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'msgBus'];
})(angular.bplus = angular.bplus || {});