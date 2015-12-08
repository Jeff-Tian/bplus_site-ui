angular.module('opdModule').directive('bopdfavourite', function() {
        return {
            restrict: "E",
            scope: {
                src: '='
            },
            templateUrl: '/view-partial/opd/detail-favourite.html',
            link: function($scope, element, attrs) {
            }
        };
    });