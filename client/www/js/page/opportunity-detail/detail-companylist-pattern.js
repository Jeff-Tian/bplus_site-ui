angular.module('opdModule').directive('bopdcompanylistpattern', ['$timeout', function($timeout) {
    var NUMBER_PER_PAGE = 10;

    return {
        restrict: "E",
        scope: {
            positions: '='
        },
        templateUrl: '/view-partial/opd/detail-companylist-pattern.html',
        link: function($scope, element, attrs) {
            var data = $scope.positions.data;
            var loginin = $scope.positions.page !== "logout";
            $scope.rawData = data;
            $scope.sid = $scope.$id; 
            $scope.displayData = {
                NUMBER_PER_PAGE: $scope.positions.NUMBER_PER_PAGE || NUMBER_PER_PAGE,
                loginin: loginin,
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
                },
                onMatchlevelClick: function(matchlevel) {
                    console.log("onMatchlevelClick", matchlevel);
                    $('.matchlevel').popup("hide");
                    $('.b-opd-matchLevelDescription-' + $scope.sid)
                      .modal("show")
                    ;
                }
            };
            $timeout(function() {
                $('.matchlevel')
                    .popup({
                        inline   : true,
                        hoverable: true,
                        position : 'top left',
                        delay: {
                          show: 300,
                          hide: 100
                        }
                      })
                    ;
            })
        }
    }
}]);