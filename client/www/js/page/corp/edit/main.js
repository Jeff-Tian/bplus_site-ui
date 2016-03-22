angular
    .module('corpModule')
    .directive('corpEdit', ['$rootScope', function ($rootScope) {
        return {
            //scope: {
            //    '*': '='
            //},
            controller: ['$scope', function ($scope) {
                $scope.openForm = function () {
                    console.log('test');
                };
            }],
            link: function (scope, element, attrs) {
                //scope.$corpEdit = angular.element(element);
            }
        };
    }])
    .directive('corpEditTitle', ['$rootScope', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                console.log('test');
            }
        };
    }]);