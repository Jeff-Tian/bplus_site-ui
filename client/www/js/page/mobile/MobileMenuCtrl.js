(function (exports) {
    exports.MobileMenuCtrl = function ($scope, $stateParams, $state, $rootScope, msgBus) {
        msgBus.onMsg(msgBus.events.viewContent.loaded, $scope, function (event, viewConfig) {
            if ($state.current.name === 'menu' && $scope.$parent) {
                $scope.$parent.menuHref = '#/home';
            }
        });
    };

    exports.MobileMenuCtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'msgBus'];
})(angular.bplus = angular.bplus || {});