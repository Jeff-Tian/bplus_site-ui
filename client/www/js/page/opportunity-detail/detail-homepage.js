angular.module('opdModule').directive('bopdhomepage', function() {
        return {
            restrict: "E",
            scope: {
                src: '='
            },
            templateUrl: '/view-partial/opd/detail-homepage.html',
            link: function($scope, element, attrs) {
            }
        }
    })