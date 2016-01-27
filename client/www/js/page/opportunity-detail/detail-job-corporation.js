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
    .controller('detailJobCorporation', ['$scope', function ($scope) {

        $scope.chartPentagon = '4-2-3-2-2';

    }]);