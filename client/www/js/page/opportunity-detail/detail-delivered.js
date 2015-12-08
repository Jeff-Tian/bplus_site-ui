angular.module('opdModule').directive('bopddelivered', function() {
        return {
            restrict: "E",
            scope: {
                src: '='
            },
            templateUrl: '/view-partial/opd/detail-delivered.html',
            link: function($scope, element, attrs) {
            }
        };
    });