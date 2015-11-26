'use strict';
angular
    .module('mobile', [
        'ng.utils',
        'pascalprecht.translate',
        'ui.router'
    ])
    .config(angular.bplus.translate)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('UpsellCtrl', angular.bplus.UpsellCtrl)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('queryParser', angular.bplus.queryParser);
