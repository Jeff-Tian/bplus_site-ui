'use strict';


// Declare app level module which depends on views, and components
angular.module('resetPassword', ['pascalprecht.translate'])
    .config(angular.bplus.translate)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('ResetPasswordCtrl', angular.bplus.ResetPasswordCtrl)
    .directive('registerForm', angular.bplus.registerForm || {})
    .controller('ResetPasswordByEmailCtrl', angular.bplus.ResetPasswordByEmailCtrl)
    .directive('captcha', angular.bplus.captcha)
    .directive('ngEnter', angular.bplus.ngEnter || {})
;