'use strict';

// Declare app level module which depends on views, and components
angular.module('signIn', ['pascalprecht.translate'])
    .config(angular.bplus.translate)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .directive('captcha', angular.bplus.captcha || {})
    .controller('SignUpCtrl', angular.bplus.SignUpCtrl)
    .controller('BindMobileCtrl', ['$scope', function ($scope) {
        $scope.bindMobile = function () {

        };
    }])
    .directive('ngEnter', angular.bplus.ngEnter || {})
    .controller('LoginCtrl', angular.bplus.LoginCtrl)
    .controller('SetPasswordCtrl', ['$scope', 'service', 'FormValidation', function ($scope, service, FormValidation) {
        var $form = $('.ui.form.set-password');
        $scope.isSetPasswordFormValid = function () {
            if ($scope.setPasswordForm.$pristine) {
                return false;
            }

            return $form.form('is valid');
        };

        $scope.setData = {
            password: ''
        };

        var submitting = false;
        $scope.trySetPassword = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            if (submitting) {
                return;
            }

            if (!$scope.isSetPasswordFormValid()) {
                return;
            }

            var mailToken = window.location.search;
            mailToken = mailToken.replace(/^.+mailToken=([^&]+).*/i, '$1');

            submitting = true;
            $scope.passwordReset = false;
            service
                .post('/service-proxy/member/resetPasswordByEmail', {
                    token: mailToken,
                    password: $scope.setData.password
                })
                .then(function (json) {
                    console.log(json);
                    $scope.passwordReset = true;
                })
                .catch(FormValidation.delegateHandleFormError($form))
                .finally(function () {
                    submitting = false;
                });
        };
    }])
    .controller('PersonalHistoryCtrl', angular.bplus.PersonalHistoryCtrl || function () {
    })
    .directive('dropdown', ['$timeout', function ($timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    $(element).parent().dropdown();
                });
            }
        };
    }])
    .directive('registerForm', angular.bplus.registerForm || {})
    .directive('tab', angular.bplus.tab || {})
;