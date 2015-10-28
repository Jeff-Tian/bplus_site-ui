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
                templateUrl: "/m/menu",
                controller: 'MobileMenuCtrl'
            })
            .state('select-payment-method', {
                url: '/select-payment-method',
                templateUrl: 'select-payment-method.html',
                controller: 'SelectPaymentMethodCtrl'
            })
            .state('alipayed', {
                url: '/select-payment-method/:payedBy',
                templateUrl: 'select-payment-method.html',
                controller: 'SelectPaymentMethodCtrl'
            })
            .state('payed', {
                url: '/payed',
                templateUrl: 'payed.html',
                controller: 'PayedCtrl'
            })
        ;
    }])
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('service', angular.bplus.service)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('MessageStore', angular.bplus.MessageStore)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('MobileIndexCtrl', angular.bplus.MobileIndexCtrl)
    .controller('MobileMenuCtrl', angular.bplus.MobileMenuCtrl)
    .controller('MobileHeadCtrl', angular.bplus.MobileHeadCtrl)
    .controller('MobileAboutusCtrl', angular.bplus.MobileAboutusCtrl)
    .controller('MobileNationalCtrl', angular.bplus.MobileNationalCtrl)
    .controller('PayedCtrl', angular.bplus.MobilePayedCtrl)
    .controller('SelectPaymentMethodCtrl', angular.bplus.SelectPaymentMethodCtrl)
;