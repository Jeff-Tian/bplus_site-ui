angular.module('opdModule').directive('bopdpositionpattern', function() {
    var NUMBER_PER_PAGE = 10;

    return {
        restrict: "E",
        scope: {
            positions: '='
        },
        templateUrl: '/view-partial/opd/detail-position-pattern.html',
        link: function($scope, element, attrs) {
            var data = $scope.positions.data;
            $scope.rawData = data;
            $scope.displayData = {
                NUMBER_PER_PAGE: $scope.positions.NUMBER_PER_PAGE || NUMBER_PER_PAGE,
                showPageMenu: $scope.positions.showPageMenu,
                showPosition: $scope.positions.showPosition,
                data: data.slice(0, NUMBER_PER_PAGE),
                onClick: function(target) {
                    //TODO
                    //TODO
                    console.log("onClick");
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