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
    .factory('queryParser', angular.bplus.queryParser)
    .factory('WechatLogon', angular.bplus.WechatLogon)
    .directive('loading', angular.bplus.loading)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .factory('MessageBox', [function () {
        return {
            show: function (msg, keep) {
                var $scope = angular.element('.brand.message-wrapper').scope();

                if (!keep) {
                    $scope.message = msg;
                } else {
                    $scope.shamelessMessage = msg;
                }

                $scope.$apply();
            }
        };
    }])
;