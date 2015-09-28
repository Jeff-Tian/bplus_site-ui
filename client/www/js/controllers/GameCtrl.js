(function(exports) {
    exports.gameCtrl = function($scope) {
        var initItem = function() {
            $scope.css = {
                home: false,
                official: false,
                national: false,
                season: false,
                personalRecord: false,
                rankingList: false
            };
        };

        initItem();

        $scope.selectItem = function(item) {
            switch (item) {
                case 'home':
                    initItem();
                    $scope.css.home = true;
                    break;
                case 'official':
                    initItem();
                    $scope.css.official = true;
                    break;
                case 'national':
                    initItem();
                    $scope.css.national = true;
                    break;
                case 'season':
                    initItem();
                    $scope.css.season = true;
                    break;
                case 'personalRecord':
                    initItem();
                    $scope.css.personalRecord = true;
                    break;
                case 'rankingList':
                    initItem();
                    $scope.css.rankingList = true;
                    break;
            }
        };
    };

    exports.gameCtrl.$inject = ['$scope'];

})(angular.bplus = angular.bplus || {});