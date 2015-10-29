(function (exports) {
    exports.MobilePaidCtrl = function ($scope, $stateParams, $state, $rootScope) {
        $scope.gameLink = window.location.href;
    };

    exports.MobilePaidCtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope'];
})(angular.bplus = angular.bplus || {});