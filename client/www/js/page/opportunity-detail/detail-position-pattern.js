angular.module('opdModule').directive('bopdpositionpattern', function() {
        var DISPLAY_ITEMS_LENGTH = 10;
        var FIRST_ITEM = "head";
        var MIDDLE_ITEM1 = "middle1";
        var MIDDLE_ITEM = "middle";
        var MIDDLE_ITEM3 = "middle3";
        var LAST_ITEM = "tail";
        return {
            restrict: "E",
            scope: {
                positions: '='
            },
            templateUrl: '/view-partial/opd/detail-position-pattern.html',
            link: function($scope, element, attrs) {
                var data = $scope.positions.data;
                var length = data.length;
                var pages = Math.ceil(length / DISPLAY_ITEMS_LENGTH);
                $scope.displayData = {
                    showPosition: $scope.positions.showPosition
                };
                pages = 1;
                $scope.paginationMenu = {
                    showMutiPages: length > DISPLAY_ITEMS_LENGTH,
                    totalPages: pages,
                    currentPage: 1,
                    leftArrowDisabled: $scope.paginationMenu.currentPage===1,
                    rightArrowDisabled: false,
                    FIRST_ITEM : "head",
                    MIDDLE_ITEM1 : "middle1",
                    MIDDLE_ITEM : "middle",
                    MIDDLE_ITEM3 : "middle3",
                    LAST_ITEM : "tail"
                };
                pages = 1;
                if (pages === 1) {
                    $scope.paginationMenu.activeItem = $scope.paginationMenu.FIRST_ITEM;
                    $scope.paginationMenu.showPreEllipsis = false;
                    $scope.paginationMenu.showPostEllipsis = false;
                } else if (pages === 2) {

                } else if(pages === 3) {

                } else if (pages === 4) {

                } else if (pages === 5) {

                } else {

                }
                $scope.$watch($scope.paginationMenu.currentPage, function(value) {
                    if (value === 1) {
                        $scope.leftArrowDisabled = true;
                    }
                    if (value === pages) {
                        $scope.rightArrowDisabled = true;
                    }
                });
                //TODO
                $('.menu .item')
                  .tab()
                ;
            }
        };
    });