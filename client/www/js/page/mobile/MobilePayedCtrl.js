(function (exports) {
    exports.MobilePayedCtrl = function ($scope, $stateParams, $state, $rootScope) {
        $scope.gameLink = window.location.href;
    };

    exports.MobilePayedCtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope'];
})(angular.bplus = angular.bplus || {});