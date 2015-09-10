'use strict';

// Declare app level module which depends on views, and components
angular.module('signIn', [])
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .directive('captcha', angular.bplus.captcha || {})
    .controller('SignUpCtrl', ['$scope', 'service', function ($scope, service) {
        $scope.registerFormCtrl = {};

        $scope.signUp = function () {
            function autoSignIn() {
                service.post('/service-proxy/logon/authentication', {
                    value: signUpData.mobile,
                    password: signUpData.password
                })
                    .then(function (json) {
                        window.location.href = 'personal-history';
                    }, $scope.registerFormCtrl.handleFormError);
            }

            var signUpData = $scope.registerFormCtrl.getFormData();

            service.post('/service-proxy/member/register', signUpData)
                .then(autoSignIn, $scope.registerFormCtrl.handleFormError);
        };
    }])
    .controller('BindMobileCtrl', ['$scope', function ($scope) {
        $scope.bindMobile = function () {

        };
    }])
    .directive('ngEnter', angular.bplus.ngEnter || {})
    .controller('LoginCtrl', ['$scope', 'FormValidation', 'service', 'MessageStore', function ($scope, FormValidation, service, MessageStore) {
        $scope.loginData = {
            mobile: '',
            password: '',
            rememberMe: false
        };

        var $loginForm = $('.ui.form.login');

        $scope.isLoginFormValid = function () {
            if ($scope.loginForm.$pristine) {
                return false;
            }

            return $loginForm.form('is valid');
        };

        $scope.tryLogin = function ($event) {
            $event.preventDefault();

            if (!$scope.isLoginFormValid()) {
                return;
            }

            service.post('/service-proxy/logon/authentication', {
                value: $scope.loginData.mobile,
                password: $scope.loginData.password,
                remember: $scope.loginData.rememberMe
            }).then(function (res) {
                MessageStore.set('{user.name}已成功登录,欢迎你回来!');

                window.location.href = '/';
            }).catch(FormValidation.delegateHandleFormError($loginForm));
        };
    }])
    .controller('SetPasswordCtrl', ['$scope', function ($scope) {
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

        $scope.trySetPassword = function () {
            if (!$scope.isSetPasswordFormValid()) {
                return;
            }

            //alert('set');
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
;

// TODO: integrated into JS framework
(function () {

    // TODO: initial tabs, to be integrated into JS framework
    $('.menu .item')
        .tab({
            context: '.b-signin-wide',
            history: true
        });

    var $form = $('.ui.form');

    $form.on('click', '.remove.circle.icon', function () {
        $form.removeClass('error');
    });

    $('.checkbox').checkbox();
})();