angular.module('opdModule').directive('bopdcompanylistpattern', function() {
    var NUMBER_PER_PAGE = 10;

    return {
        restrict: "E",
        scope: {
            positions: '='
        },
        templateUrl: '/view-partial/opd/detail-companylist-pattern.html',
        link: function($scope, element, attrs) {
            var data = $scope.positions.data;
            $scope.rawData = data;
            $scope.displayData = {
                NUMBER_PER_PAGE: $scope.positions.NUMBER_PER_PAGE || NUMBER_PER_PAGE,
                showPageMenu: $scope.positions.showPageMenu,
                data: data.slice(0, NUMBER_PER_PAGE),
                onCompanyClick: function(target) {
                    //TODO
                    //TODO
                    console.log("onCompanyClick");
                },
                onPositionClick: function(target) {
                    //TODO
                    //TODO
                    console.log("onPositionClick");
                },
                onDelete: function(target, $event) {
                    $event.stopPropagation();
                    //TODO
                    console.log("onDelete");
                }
            };
        }
    }
});