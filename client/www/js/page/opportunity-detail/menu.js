angular.module('opdModule').directive('bopdmenu', function() {
        return {
            restrict: "E",
            scope: {
                src: '='
            },
            templateUrl: '/view-partial/opd/menu.html',
            link: function($scope, element, attrs) {
            }
        }
    })