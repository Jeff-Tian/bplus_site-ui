'use strict';

// Declare app level module which depends on views, and components
angular.module('bplusModule', [
    'ng.utils',
    'pascalprecht.translate'
])
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .controller('AppCtrl', angular.bplus.AppCtrl)
;