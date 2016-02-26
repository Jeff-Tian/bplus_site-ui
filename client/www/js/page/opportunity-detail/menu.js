angular.module('opdModule').directive('bopdmenu', function () {
    return {
        restrict: "E",
        scope: true,
        templateUrl: '/view-partial/opd/menu.html',
        link: function ($scope, element, attrs) {
        }
    };
});