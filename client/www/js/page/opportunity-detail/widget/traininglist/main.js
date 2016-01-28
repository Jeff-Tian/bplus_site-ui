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

        return {
            templateUrl: 'js/page/opportunity-detail/widget/traininglist/main.html',
            scope: {
                datalist: '='
            },
            link: function ($scope, element, attrs) {
                NUMBER_PER_PAGE =  $scope.datalist.NUMBER_PER_PAGE || NUMBER_PER_PAGE;
                var data = $scope.datalist.data;
                $scope.rawData = data;
                $scope.displayData = {
                    NUMBER_PER_PAGE: $scope.datalist.NUMBER_PER_PAGE || NUMBER_PER_PAGE,
                    showPageMenu: $scope.datalist.showPageMenu,
                    data: data.slice(0, NUMBER_PER_PAGE),
                    onClick: function(target) {
                        //TODO
                    }
                };
            }
        }
    });