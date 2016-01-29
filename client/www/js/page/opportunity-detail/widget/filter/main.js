angular
    .module('opdModule')
    .directive('opdFilter', function () {
        return {
            templateUrl: 'js/page/opportunity-detail/widget/filter/main.html',
            scope: {
                filters: '=',
                filterSetting: '='
            },
            link: function (scope, element, arrts) {
                scope.equals = function (o1, o2) {
                    return angular.equals(o1, o2);
                };
            }
        };
    })
    .directive('opdInlineFilter', function () {
        return {
            templateUrl: 'js/page/opportunity-detail/widget/filter/inline-filter.html',
            scope: {
                filters: '=',
                filterSetting: '='
            },
            link: function (scope, element, attrs) {
                scope.equals = function (o1, o2) {
                    return angular.equals(o1, o2);
                };
            }
        };
    })
;