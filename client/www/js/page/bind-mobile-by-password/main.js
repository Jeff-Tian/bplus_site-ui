'use strict';

// Declare app level module which depends on views, and components
angular.module('bindMobileByPassword', ['pascalprecht.translate', 'ng.utils'])
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('queryParser', angular.bplus.queryParser)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('BindMobileByPasswordCtrl', ['$scope', 'service', 'FormValidation', function ($scope, service, FormValidation) {
        $scope.bindData = {
            mobile: '',
            password: ''
        };

        var $form = $('.ui.form.login');

        $scope.isLoginFormValid = function () {
            if ($scope.loginForm.$pristine) {
                return false;
            }

            return $form.form('is valid');
        };

        var submitting = false;

        $scope.bindMobile = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            if (submitting) {
                return;
            }

            if (!$scope.isLoginFormValid()) {
                return;
            }

            submitting = true;
            service
                .post('/service-proxy/member/bind-mobile-by-password', {
                    value: $scope.bindData.mobile,
                    password: $scope.bindData.password
                })
                .then(function () {
                    window.location.href = $scope.localeUrl('/');
                })
                .catch(FormValidation.delegateHandleFormError($form))
                .finally(function () {
                    submitting = false;
                });
        };
    }])
;