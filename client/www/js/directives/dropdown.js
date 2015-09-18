(function (exports) {
    exports.dropdown = function ($timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    $(element).parent().dropdown();
                });
            }
        };
    };

    exports.dropdown.$inject = ['$timeout'];
})(angular.bplus = angular.bplus || {});