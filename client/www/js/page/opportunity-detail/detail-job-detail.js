angular
    .module('opdModule')
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
        $scope.competitiveness = 80;

        $scope.joblist = [{
            competitiveness: 20
        }, {
            competitiveness: 40
        }, {
            competitiveness: 60
        }, {
            competitiveness: 80
        }, {
            competitiveness: 100
        }];

        $scope.traininglist = [{
            read: 190
        }, {
            read: 192
        }];
    }]);