angular.module('bplusModule')
    .directive('formError', [function () {
        return {
            template: '<div class="ui error message brand"><ul class="list"><li ng-repeat="m in errorMessages">{{m}}</li></ul><i class="large remove circle icon" ng-click="errorMessages = []"></i> </div>',
            replace: true
        };
    }])
;