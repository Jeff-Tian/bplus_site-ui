angular.module('opdModule').directive('bopdpositionpattern', ['$window', function($window) {
    var NUMBER_PER_PAGE = 10;

    return {
        restrict: "E",
        scope: {
            positions: '='
        },
        templateUrl: '/view-partial/opd/detail-position-pattern.html',
        link: function($scope, element, attrs) {
            var data = $scope.positions.data,
                $element = angular.element(element),
                $tbody = $element.find('> table > tbody');
            $scope.rawData = data;
            $scope.displayData = {
                NUMBER_PER_PAGE: $scope.positions.NUMBER_PER_PAGE || NUMBER_PER_PAGE,
                showPageMenu: $scope.positions.showPageMenu,
                showPosition: $scope.positions.showPosition,
                showPageMore: $scope.positions.showPageMore,
                pageMoreHash: $scope.positions.pageMoreHash,
                data: data.slice(0, NUMBER_PER_PAGE),
                onClick: function(target, $index) {
                    var url = $tbody.find('> tr').eq($index).find('> td.desc > h3 > a').eq(0).prop('href');
                    if (!/\#\/job\/$/.test(url)) {
                        $window.location.href = url;
                    }
                    console.log("onClick");
                },
                onDelete: function(target, $event) {
                    $event.stopPropagation();
                    //TODO
                    console.log("onDelete");
                },
                onMoreClick: function(){
                    location.hash = $scope.positions.pageMoreHash;
                }
            };
        }
    }
}]);