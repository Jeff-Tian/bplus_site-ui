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
        }
    })
    .directive('bopdTraininglist', function () {
        return {
            templateUrl: 'js/page/opportunity-detail/widget/traininglist/main.html',
            link: function (scope, element, attrs) {
                ;
            }
        };
    });