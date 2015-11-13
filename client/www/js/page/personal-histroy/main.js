'use strict';

// Declare app level module which depends on views, and components
angular.module('personalHistory', ['pascalprecht.translate', 'ng.utils'])
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('queryParser', angular.bplus.queryParser)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('PersonalHistoryCtrl', angular.bplus.PersonalHistoryCtrl)
    .directive('dropdown', angular.bplus.dropdown)
;