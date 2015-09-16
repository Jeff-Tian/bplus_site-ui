'use strict';

// Declare app level module which depends on views, and components
angular.module('accountSetting', ['pascalprecht.translate'])
    .config(angular.bplus.translate)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .directive('captcha', angular.bplus.captcha || {})
;