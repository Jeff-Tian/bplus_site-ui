'use strict';

// Declare app level module which depends on views, and components
angular
    .module('mobile', [
        'ng.utils',
        'pascalprecht.translate',
        'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controller: 'MobileIndexCtrl'
            })
            .state('menu', {
                url: "/menu",
                templateUrl: "menu",
                controller: 'MobileMenuCtrl'
            })
        ;
    }])
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('MobileIndexCtrl', angular.bplus.MobileIndexCtrl)
    .controller('MobileMenuCtrl', angular.bplus.MobileMenuCtrl)
    .controller('MobileHeadCtrl', angular.bplus.MobileHeadCtrl)
;