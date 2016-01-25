angular
    .module('opdModule')
    .directive('bopdCompetitiveness', function () {
        return {
            template: '<div class="bopd-competitiveness-body"><div class="bopd-competitiveness-left"><div class="bopd-competitiveness-left-cycle"></div></div><div class="bopd-competitiveness-right"><div class="bopd-competitiveness-right-cycle"></div></div><div class="bopd-competitiveness-txt"></div></div>',
            link: function (scope, element, attrs) {
                var $element = angular.element(element),
                    $txt = $element.find('.bopd-competitiveness-txt'),
                    percent = parseInt(attrs.bopdCompetitiveness) || 0;
                $element.addClass('bopd-competitiveness').addClass('bopd-competitiveness-' + percent);
                $txt.text(percent + '%');
            }
        };
    })
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
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('job/detail', {
            url: '/job/:jobid',
            templateUrl: 'job-detail.html',
            controller: 'detailJobDetail'
        });
    }])
    .directive('bopdjobdetail', function () {
        return {
            templateUrl: '/view-partial/opd/detail-job-detail.html',
            link: function (scope, element, attrs) {
                scope.$element = angular.element(element);
            }
        };
    })
    .controller('detailJobDetail', ['$scope', function ($scope) {
        $scope.competitiveness = [0, 20, 40, 60, 80, 100];
    }]);