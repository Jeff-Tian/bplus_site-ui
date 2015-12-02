angular.module('opdModule').directive('bopdtraining', function() {
        return {
            restrict: "E",
            scope: {
                src: '='
            },
            templateUrl: '/view-partial/opd/detail-training.html',
            link: function($scope, element, attrs) {
            }
        }
    })