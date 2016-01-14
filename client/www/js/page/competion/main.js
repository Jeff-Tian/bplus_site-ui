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
    .factory('WechatLogon', angular.bplus.WechatLogon)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('DurableMessageCtrl', ['$http', '$scope', function ($http, $scope) {
        $http.get(angular.bplus.config.durableMessageSource)
            .then(function (result) {
                $scope.durableMessages = result.data;
            })
        ;
    }])
;