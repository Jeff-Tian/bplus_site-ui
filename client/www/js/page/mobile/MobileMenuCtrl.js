(function (exports) {
    exports.MobileMenuCtrl = function ($scope, $stateParams, $state, $rootScope, msgBus, DeviceHelper) {
        msgBus.onMsg(msgBus.events.viewContent.loaded, $scope, function (event, viewConfig) {
            if ($state.current.name === 'menu' && $scope.$parent) {
                if(DeviceHelper.isMobile()) {
                    window.sendTrack('m.index.menu');
                }
                $scope.$parent.menuHref = '#/home';
            }
        });
    };

    exports.MobileMenuCtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'msgBus', 'DeviceHelper'];
})(angular.bplus = angular.bplus || {});