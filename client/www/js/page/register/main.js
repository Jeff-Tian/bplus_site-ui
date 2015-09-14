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
    .directive('tab', angular.bplus.tab)
;

// TODO: integrated into JS framework
(function () {
    var $form = $('.ui.form');

    $form.on('click', '.remove.circle.icon', function () {
        $form.removeClass('error');
    });

    $('.checkbox').checkbox();
})();