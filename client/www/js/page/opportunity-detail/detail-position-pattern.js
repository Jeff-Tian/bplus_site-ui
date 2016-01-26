angular.module('opdModule').directive('bopdpositionpattern', function() {
        var DISPLAY_ITEMS_LENGTH = 10;
        var FIRST_ITEM = "head";
        var MIDDLE_ITEM1 = "middle1";
        var MIDDLE_ITEM = "middle";
        var MIDDLE_ITEM3 = "middle3";
        var LAST_ITEM = "tail";
        var pageDisplayFunction = function(paginationMenu) {
            switch (currentPage) {
                case 1:

                    break;
                case 1:
                break;
                case 1:
                break;
                case 1:
                break;
                case 1:
                break;
                case 1:
                break;
                case 1:
                break;
                case 1:
                break;
                case 1:
                break;
                case 1:
                break;
                case 1:
                break;
            }
        };
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
                    showMutiPages: $scope.positions.showPageMenu && length > DISPLAY_ITEMS_LENGTH,
                    totalPages: pages,
                    currentPage: 1,
                    leftArrowDisabled: true,
                    rightArrowDisabled: false,
                    pageMenuClick: function() {
                         console.log("function");
                    },
                    FIRST_ITEM : "head",
                    MIDDLE_ITEM1 : "middle1",
                    MIDDLE_ITEM : "middle",
                    MIDDLE_ITEM3 : "middle3",
                    LAST_ITEM : "tail"
                };
                //Page menu config
                pages = 1;
                $scope.paginationMenu.activeItem = $scope.paginationMenu.FIRST_ITEM;
                if (pages === 1) {
                    $scope.paginationMenu.showPreEllipsis = false;
                    $scope.paginationMenu.showPostEllipsis = false;
                } else if (pages === 2) {
                    $scope.paginationMenu.showPreEllipsis = false;
                    $scope.paginationMenu.showPostEllipsis = false;
                } else if(pages === 3) {
                    $scope.paginationMenu.showPreEllipsis = false;
                    $scope.paginationMenu.showPostEllipsis = false;
                } else if (pages === 4) {
                    $scope.paginationMenu.showPreEllipsis = false;
                    $scope.paginationMenu.showPostEllipsis = false;
                } else if (pages === 5) {
                    $scope.paginationMenu.showPreEllipsis = false;
                    $scope.paginationMenu.showPostEllipsis = false;
                } else {
                    $scope.paginationMenu.showPreEllipsis = false;
                    $scope.paginationMenu.showPostEllipsis = false;
                }
                $scope.$watch($scope.paginationMenu.currentPage, function(value) {
                    if (value === 1) {
                        $scope.leftArrowDisabled = true;
                    }
                    if (value === pages) {
                        $scope.rightArrowDisabled = true;
                    }
                });
                ///////////
                $('.menu .item')
                  .tab()
                ;
            }
        };
    });