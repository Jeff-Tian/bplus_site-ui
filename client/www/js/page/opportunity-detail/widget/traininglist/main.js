angular
    .module('opdModule')
    .directive('shapeFlip', function () {
        return {
            link: function (scope, element, arrts) {
                var $element = angular.element(element),
                    $shape = $element.find('.shape'),
                    $btnPreview = $element.find('.btn-preview'),
                    isPreview = $btnPreview.find('i').hasClass('grey'),
                    $btnNext = $element.find('.btn-next'),
                    isNext = $btnNext.find('i').hasClass('grey');
                if ($shape.length && $shape.shape) {
                    $shape.shape();
                    $btnPreview.on('click', function () {
                        if (isPreview) {
                            $shape.shape('flip left');
                        }
                    });
                    $btnNext.on('click', function () {
                        if (isNext) {
                            $shape.shape('flip right');
                        }
                    });
                }
            }
        };
    })
    .directive('bopdTraininglist', function () {
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
            templateUrl: 'js/page/opportunity-detail/widget/traininglist/main.html',
            scope: {
                traininglist: '=list'
            },
            link: function ($scope, element, attrs) {
                NUMBER_PER_PAGE =  $scope.traininglist.NUMBER_PER_PAGE || NUMBER_PER_PAGE;
                var data = $scope.traininglist.data;
                var length = data.length;
                var pages = Math.ceil(length / NUMBER_PER_PAGE);
                $scope.displayData = {
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
                    showMutiPages: $scope.traininglist.showPageMenu && length > NUMBER_PER_PAGE,
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