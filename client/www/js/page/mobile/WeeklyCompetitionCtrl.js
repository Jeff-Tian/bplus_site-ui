(function (exports) {
    exports.WeeklyCompetitionCtrl = function ($scope, $stateParams, $state, msgBus) {
        msgBus.onMemberLoaded($scope, function () {
            $scope.memberLoaded = true;

            if ($scope.memberInfo && $scope.memberInfo.member_id) {
                $scope.loggedOn = true;
            } else {
                window.location.href = '/m/sign-in?return_url=' + encodeURIComponent(location.pathname + location.hash);
            }
        });
    };

    exports.WeeklyCompetitionCtrl.$inject = ['$scope', '$stateParams', '$state', 'msgBus'];
})(angular.bplus = angular.bplus || {});