'use strict';

angular
    .module('bplus', [
        'ng.utils',
        'pascalprecht.translate',
        'cmpt'
    ])
    .config(angular.bplus.xhr)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('queryParser', angular.bplus.queryParser)
    .controller('AppCtrl', angular.bplus.AppCtrl);