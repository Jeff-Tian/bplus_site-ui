'use strict';

// Declare app level module which depends on views, and components
angular.module('map', [
    'ui.router',
    'ng.utils',
    'pascalprecht.translate'
])
    .config([
        '$urlRouterProvider',
        function ($urlRouterProvider) {
        }
    ])
    .run(function () {
    })
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('service', angular.bplus.service)
    .factory('FormValidation', angular.bplus.FormValidation || function () {
        return {};
    })
    .factory('MessageStore', angular.bplus.MessageStore)
    .directive('chinaMap', angular.bplus.chinaMap || {})
;
(function () {
    $('.ui.sticky').sticky({
        observeChanges: true,
        context: '#national-list'
      })
    ;

})();