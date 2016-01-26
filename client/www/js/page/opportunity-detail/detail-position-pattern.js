angular.module('opdModule').directive('bopdpositionpattern', function() {
        var NUMBER_PER_PAGE = 10;
        var FIRST_PAGE = 1;

        var displayPage = function($scope, data) {
            //Common params
            var paginationMenu = $scope.paginationMenu;
            var currentPage = paginationMenu.currentPage;
            var totalPages = paginationMenu.totalPages;
            //Refresh displaydata
            $scope.displayData.data = data.slice((currentPage - 1) * NUMBER_PER_PAGE, currentPage * NUMBER_PER_PAGE);
            //Refresh paginationMenu
            paginationMenu.showPreEllipsis = currentPage >= (FIRST_PAGE + 3);
            paginationMenu.showPostEllipsis = currentPage <= (totalPages - 3);
            paginationMenu.leftArrowDisabled = currentPage === FIRST_PAGE;
            paginationMenu.rightArrowDisabled = currentPage === totalPages;
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
                    break;
                default:
                    paginationMenu.activeItem = paginationMenu.MIDDLE_ITEM;
                    break;
            }
            if (currentPage < (FIRST_PAGE + 2)) {
                paginationMenu.middleNumber = FIRST_PAGE + 2;
            } else if (currentPage > totalPages - 2) {
                paginationMenu.middleNumber = totalPages - 2;
            } else {
                paginationMenu.middleNumber = currentPage;
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
                var pages = Math.ceil(length / NUMBER_PER_PAGE);
                $scope.displayData = {
                    showPosition: $scope.positions.showPosition,
                    data: data.slice(0, NUMBER_PER_PAGE),
                    onClick: function(target) {
                        //TODO
                    },
                    onDelete: function(target, $event) {
                        $event.stopPropagation();
                        //TODO
                    }
                };
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
                    showMutiPages: $scope.positions.showPageMenu && length > NUMBER_PER_PAGE,
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
                //Semantic UI
                $('.menu .item')
                  .tab()
                ;
            }
        };
    });