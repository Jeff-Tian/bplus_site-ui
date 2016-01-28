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
;