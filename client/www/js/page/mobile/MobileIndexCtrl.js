(function (exports) {
    exports.MobileIndexCtrl = function ($scope, $stateParams, $state, $rootScope, msgBus) {
        msgBus.onMsg(msgBus.events.viewContent.loaded, $scope, function (event, viewConfig) {
            if ($state.current.name === 'home' && $scope.$parent) {
                $scope.$parent.menuHref = '#/menu';
            }
        });
    };

    exports.MobileIndexCtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'msgBus'];
})(angular.bplus = angular.bplus || {});