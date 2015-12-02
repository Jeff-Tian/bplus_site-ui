angular.module('opdModule').directive('bopdrecommendation', function() {
        return {
            restrict: "E",
            scope: {
                src: '='
            },
            templateUrl: '/view-partial/opd/detail-recommendation.html',
            link: function($scope, element, attrs) {
            }
        }
    })