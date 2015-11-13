'use strict';


// Declare app level module which depends on views, and components
angular.module('resetPassword', ['pascalprecht.translate', 'ng.utils'])
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('queryParser', angular.bplus.queryParser)
    .directive('loading', angular.bplus.loading)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('ResetPasswordCtrl', angular.bplus.ResetPasswordCtrl)
    .directive('registerForm', angular.bplus.registerForm || {})
    .controller('ResetPasswordByEmailCtrl', angular.bplus.ResetPasswordByEmailCtrl)
    .directive('captcha', angular.bplus.captcha)
    .directive('ngEnter', angular.bplus.ngEnter || {})
;