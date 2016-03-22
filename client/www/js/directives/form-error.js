angular.module('bplusModule')
    .directive('formError', [function () {
        return {
            scope: {
                scope: '='
            },
            template: '<div class="ui error message brand"><ul class="list"><li ng-repeat="m in (errorMessages || scope.errorMessages)">{{m}}</li></ul><i class="large remove circle icon" ng-click="errorMessages = scope.errorMessages = undefined"></i> </div>',
            replace: true
        };
    }])
;