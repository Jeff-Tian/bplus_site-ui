angular.module('opdModule').directive('bopdpositionpattern', ['$window', '$timeout', function($window, $timeout) {
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
            $scope.sid = $scope.$id;
            var loginin = $scope.positions.page !== "logout";
            NUMBER_PER_PAGE = $scope.positions.NUMBER_PER_PAGE || NUMBER_PER_PAGE;
            $scope.displayData = {
                NUMBER_PER_PAGE: $scope.positions.NUMBER_PER_PAGE || NUMBER_PER_PAGE,
                loginin: loginin,
                deleteable: $scope.positions.deleteable !== "false",
                showPageMenu: $scope.positions.showPageMenu,
                showPosition: $scope.positions.showPosition,
                showPageMore: $scope.positions.showPageMore,
                pageMoreHash: $scope.positions.pageMoreHash,
                data: data.slice(0, NUMBER_PER_PAGE),
                getData: $scope.positions.getData,
                onClick: function(target, $index) {
                    var url = $tbody.find('> tr').eq($index).find('> td.desc > h3 > a').eq(0).prop('href');
                    if (!/\#\/job\/$/.test(url)) {
                        $window.location.href = url;
                    }
                    console.log("onClick");
                },
                onCompanyClick: function(target, $index) {
                    console.log("onCompanyClick");
                },
                onDelete: function(target, $event) {
                    $event.stopPropagation();
                    //TODO
                    console.log("onDelete");
                },
                onMoreClick: function(){
                    location.hash = $scope.positions.pageMoreHash;
                },
                onMatchlevelClick: function(target, level) {
                    $scope.chosenLevel = level;
                    var $target = '.b-opd-modal-position-matchlevel-';
                    if (target === "competitiveness") {
                        $target = '.b-opd-modal-competitiveness-matchlevel-';
                    }
                    $target += $scope.sid;
                    $('.ui.popup').popup("hide");
                    $($target).modal("show");
                    // $($element).find($target)
                    //   .modal("show")
                    // ;
                    
                }
            };
            $scope.choisenLevel = "";
            $scope.staticCompetitiveDataArray = [];
            for (var i = 5; i >= 0; i--) {
                $scope.staticCompetitiveDataArray.push({progressRate: (i * 20)});
            }

            $timeout(function() {
                $('.b-opd-position-matchlevel')
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
               $('.b-opd-position-progressrate')
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
              $('.b-opd-help-position')
                  .popup({
                    popup: '.b-opd-popup-help-matchlevel.popup',
                    position: 'bottom left',
                  })
                 ;
              $('.b-opd-help-competitiveness')
                  .popup({
                    popup: '.b-opd-popup-help-progressrate.popup',
                    position: 'bottom left',
                  })
                 ;
            });
        }
    };
}]);