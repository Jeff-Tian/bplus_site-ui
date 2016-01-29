angular
    .module('opdModule')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('job/corporation', {
            url: '/job/corporation/:corporationid',
            templateUrl: 'job-corporation.html',
            controller: 'detailJobCorporation'
        });
    }])
    .directive('bopdjobcorporation', function () {
        return {
            templateUrl: '/view-partial/opd/detail-job-corporation.html',
            link: function (scope, element, attrs) {
                scope.$element = angular.element(element);
            }
        };
    })
    .directive('introJobs', function () {
        return {
            link: function (scope, element, arrts) {
                angular.element(element).find('.menu .item').tab();
            }
        };
    })
    .directive('favoriteCorporation', function () {
        return {
            link: function (scope, element, attrs) {
                var $element = angular.element(element);
                var id = attrs.favoriteCorporation;
                $element.on('click', function () {
                    if (!$element.hasClass('disabled')) {
                        window.alert('Favorite Corporation!');
                        $element.addClass('disabled');
                    }
                });
            }
        };
    })
    .controller('detailJobCorporation', ['$scope', function ($scope) {

        $scope.chartPentagon = '4-2-3-2-2';

    }]);