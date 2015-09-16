'use strict';

// Declare app level module which depends on views, and components
angular.module('accountSetting', ['pascalprecht.translate'])
    .config(angular.bplus.translate)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .directive('captcha', angular.bplus.captcha)
    .directive('ngEnter', angular.bplus.ngEnter)
    .directive('registerForm', angular.bplus.registerForm)
    .controller('changeMobileCtrl', ['$scope', 'service', function ($scope, service) {
        $scope.changeMobileFormCtrl = {};

        var submitting = false;
        $scope.changeMobile = function () {
            if (submitting) {
                return;
            }

            submitting = true;
            service
                .post('/service-proxy/member/change-mobile', $scope.changeMobileFormCtrl.getFormData())
                .then(function (res) {
                    console.log(res);
                })
                .catch($scope.changeMobileFormCtrl.handleFormError)
                .finally(function () {
                    submitting = false;
                });
        };
    }])
;