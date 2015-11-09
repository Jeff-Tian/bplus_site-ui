'use strict';

// Declare app level module which depends on views, and components
angular.module('bplus', [
    'ng.utils',
    'pascalprecht.translate',
    'preheating'
])
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('service', angular.bplus.service)
    .factory('FormValidation', angular.bplus.FormValidation || function () {
        return {};
    })
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .controller('AppCtrl', angular.bplus.AppCtrl)
;
// TODO: integrated into JS framework
(function() {
})();