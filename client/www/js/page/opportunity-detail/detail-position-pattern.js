angular.module('opdModule').directive('bopdpositionpattern', function() {
        return {
            restrict: "E",
            scope: {
                positions: '='
            },
            templateUrl: '/view-partial/opd/detail-position-pattern.html',
            link: function($scope, element, attrs) {
                //TODO
                $('.menu .item')
                  .tab()
                ;
            }
        };
    });