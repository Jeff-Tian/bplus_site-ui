'use strict';


// Declare app level module which depends on views, and components
angular.module('resetPassword', [])
    .factory('FormValidation', angular.bplus.FormValidation)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('ResetPasswordCtrl', angular.bplus.ResetPasswordCtrl)
    .directive('registerForm', angular.bplus.registerForm || {})
    .controller('ResetPasswordByEmailCtrl', angular.bplus.ResetPasswordByEmailCtrl)
    .directive('captcha', angular.bplus.captcha)
;