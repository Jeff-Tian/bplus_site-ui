angular.module('opdModule').directive('bopdpaginationpattern', function () {
    var FIRST_PAGE = 1;

    var displayPage = function($scope, data) {
        var NUMBER_PER_PAGE =  $scope.displaydata.NUMBER_PER_PAGE;
        //Common params
        var paginationMenu = $scope.paginationMenu;
        var currentPage = paginationMenu.currentPage; 
        var totalPages = paginationMenu.totalPages;
        //Refresh displaydata
        $scope.displaydata.data = data.slice((currentPage - 1) * NUMBER_PER_PAGE, currentPage * NUMBER_PER_PAGE);
        //Refresh paginationMenu
        switch (currentPage) {
            case 1:
                paginationMenu.activeItem = paginationMenu.FIRST_ITEM;
                break;
            case totalPages:
                paginationMenu.activeItem = paginationMenu.LAST_ITEM;
                break;
            case 2:
                paginationMenu.activeItem = paginationMenu.MIDDLE_ITEM1;
                break;
            case (totalPages - 1):
                paginationMenu.activeItem = paginationMenu.MIDDLE_ITEM3;
                if (totalPages === 4) {
                    //In this case, MIDDLE_ITEM3 is hidden.
                    paginationMenu.activeItem = paginationMenu.MIDDLE_ITEM;
                }
                break;
            default:
                paginationMenu.activeItem = paginationMenu.MIDDLE_ITEM;
                break;
        }
        if (totalPages <= 5) {
            paginationMenu.middleNumber = FIRST_PAGE + 2;
        } else if (currentPage < (FIRST_PAGE + 2)) {
            paginationMenu.middleNumber = FIRST_PAGE + 2;
        } else if (currentPage > totalPages - 2) {
            paginationMenu.middleNumber = totalPages - 2;
        } else {
            paginationMenu.middleNumber = currentPage;
        }
        paginationMenu.showPreEllipsis = paginationMenu.middleNumber >= (FIRST_PAGE + 3);
        paginationMenu.showPostEllipsis = paginationMenu.middleNumber <= (totalPages - 3);
        paginationMenu.leftArrowDisabled = currentPage === FIRST_PAGE;
        paginationMenu.rightArrowDisabled = currentPage === totalPages;
    };
    return {
        restrict: "E",
        scope: {
            displaydata: '=',
            rawdata: "="
        },
        templateUrl: '/view-partial/opd/detail-pagination-pattern.html',
        link: function($scope, element, attrs) {
            var data = $scope.rawdata;
            var length = data.length;
            var pages = Math.ceil(length / $scope.displaydata.NUMBER_PER_PAGE);
            var head = "head";
            $scope.paginationMenu = {
                //Static values
                FIRST_ITEM : head,
                MIDDLE_ITEM1 : "middle1",
                MIDDLE_ITEM : "middle",
                MIDDLE_ITEM3 : "middle3",
                LAST_ITEM : "tail",
                PREVIOUS: "previous",
                NEXT: "next",
                totalPages: pages,
                //Run time values
                currentPage: FIRST_PAGE,
                leftArrowDisabled: true,
                rightArrowDisabled: false,
                middleNumber: 1,
                activeItem: head,
                showPreEllipsis: false,
                showPostEllipsis: false,
                //Action
                pageMenuClick: function(item) {
                     switch (item) {
                        case $scope.paginationMenu.PREVIOUS:
                            if ($scope.paginationMenu.currentPage !== FIRST_PAGE) {
                                $scope.paginationMenu.currentPage--;
                                displayPage($scope, data);
                            }
                            break;
                        case $scope.paginationMenu.NEXT:
                            if ($scope.paginationMenu.currentPage !== $scope.paginationMenu.totalPages) {
                                $scope.paginationMenu.currentPage++;
                                displayPage($scope, data);
                            }
                            break;
                        default:
                            if ($scope.paginationMenu.currentPage !== item) {
                                $scope.paginationMenu.currentPage = item;
                                displayPage($scope, data);
                            }
                            break;
                     }
                },
            };
            displayPage($scope, data);
        }
    };
});