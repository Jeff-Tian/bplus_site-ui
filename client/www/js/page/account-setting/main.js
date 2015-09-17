'use strict';

// Declare app level module which depends on views, and components
angular.module('accountSetting', ['pascalprecht.translate'])
    .config(angular.bplus.translate)
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }])
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .directive('captcha', angular.bplus.captcha)
    .directive('ngEnter', angular.bplus.ngEnter)
    .directive('registerForm', angular.bplus.registerForm)
    .controller('changeMobileCtrl', ['$scope', 'service', '$filter', function ($scope, service, $filter) {
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
                    $('.ui.modal.b-modify-mobile').modal('hide');

                    $scope.fetchProfile();
                    $scope.changeMobileFormCtrl.getForm().form('clear');

                    $scope.$parent.message = $filter('translate')('ChangeMobileSuccess');
                })
                .catch($scope.changeMobileFormCtrl.handleFormError)
                .finally(function () {
                    submitting = false;
                });
        };
    }])
    .controller('changeEmailCtrl', ['$scope', 'service', '$filter', 'FormValidation', function ($scope, service, $filter, FormValidation) {
        $scope.data = {};

        $scope.isChangeEmailFormValid = function () {
            return $scope.data.email && $scope.data.captcha;
        };

        var submitting = false;
        $scope.changeEmail = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            if (submitting) {
                return;
            }

            var $form = $('.b-modify-email form');
            submitting = true;
            service
                .post('/service-proxy/member/change-email', $scope.data)
                .then(function (res) {
                    console.log(res);
                    $scope.fetchProfile();
                    $form.form('clear');
                    $('.ui.modal.b-modify-email').modal('hide');
                    $scope.$parent.message = $filter('translate')('ChangeEmailSuccess');
                })
                .catch(FormValidation.delegateHandleFormError($form))
                .finally(function () {
                    submitting = false;
                })
            ;
        };
    }])
    .controller('changePasswordCtrl', ['$scope', 'service', '$filter', 'FormValidation', '$rootScope', function ($scope, service, $filter, FormValidation, $rootScope) {
        $scope.data = {};

        $scope.isChangePasswordFormValid = function () {
            return $scope.data.password && $scope.data.newPassword;
        };

        var submitting = false;
        $scope.changePassword = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            if (submitting) {
                return;
            }

            var $form = $('.b-modify-password form');
            submitting = true;

            service
                .post('/service-proxy/member/change-password', $scope.data)
                .then(function (res) {
                    console.log(res);

                    $form.form('clear');
                    $('.ui.modal.b-modify-password').modal('hide');
                    $scope.$parent.message = $filter('translate')('ChangePasswordSuccess');
                })
                .catch(FormValidation.delegateHandleFormError($form))
                .finally(function () {
                    submitting = false;
                });
        };
    }])
;