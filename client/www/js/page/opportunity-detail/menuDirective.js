(function (exports) {
    exports.leftColumnMenu = function () {
        return {
            restrict: "E",
            scope: true,
            templateUrl: '/view-partial/opd/menu.html',
            link: function ($scope, element, attrs) {
                console.log("hello')");
            }
        };
    };

    exports.leftColumnMenu.$inject = [];
})(angular.bplus = angular.bplus || {});