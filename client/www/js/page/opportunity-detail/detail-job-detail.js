angular
    .module('opdModule')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('job/detail', {
            url: '/job/:jobid',
            templateUrl: 'job-detail.html',
            controller: 'detailJobDetail'
        });
    }])
    .directive('bopdjobdetail', function() {
        return {
            templateUrl: '/view-partial/opd/detail-job-detail.html',
            link: function(scope, element, attrs) {
                ;
            }
        };
    })
    .controller('detailJobDetail', ['$scope', function ($scope) {
        $scope.title = 'Hello World !';
    }]);