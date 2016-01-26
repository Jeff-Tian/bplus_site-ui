angular.module('opdModule')
    .directive('bopdjob', function () {
        return {
            restrict: "E",
            scope: {
                src: '='
            },
            templateUrl: '/view-partial/opd/detail-job.html',
            link: function ($scope, element, attrs) {
            }
        };
    })
;