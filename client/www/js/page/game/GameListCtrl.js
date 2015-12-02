(function (exports) {
    exports.GameListCtrl = function ($scope, service) {
        service.get(angular.bplus.config.serviceUrls.loadGameSeries.replace(':seriesId', angular.bplus.config.competitions['national-2015'].seriesId))
            .then(function (result) {
                $scope.top10Epics = result.epics.sort(function (epic1, epic2) {
                    return (new Date(epic2.game_from)) - (new Date(epic1.game_from));
                }).slice(0, 10);
            });
    };

    exports.GameListCtrl.$inject = ['$scope', 'service'];
})(angular.bplus = angular.bplus || {});