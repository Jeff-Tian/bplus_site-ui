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
            .state('paidBy', {
                url: '/select-payment-method/:paidBy',
                templateUrl: 'select-payment-method.html',
                controller: 'SelectPaymentMethodCtrl'
            })
            .state('continue-paying', {
                url: '/continue-paying/:paymentMethod',
                templateUrl: 'select-payment-method.html',
                controller: 'SelectPaymentMethodCtrl'
            })
            .state('paid', {
                url: '/paid/:who/:displayName/:redemptionCode',
                templateUrl: 'paid.html',
                controller: 'PaidCtrl'
            })
        ;
    }])
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .directive('loading', angular.bplus.loading)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('service', angular.bplus.service)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('queryParser', angular.bplus.queryParser)
    .factory('WechatWrapper', angular.bplus.WechatWrapper)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('MobileIndexCtrl', angular.bplus.MobileIndexCtrl)
    .controller('MobileMenuCtrl', angular.bplus.MobileMenuCtrl)
    .controller('MobileHeadCtrl', angular.bplus.MobileHeadCtrl)
    .controller('MobileAboutusCtrl', angular.bplus.MobileAboutusCtrl)
    .controller('MobileNationalCtrl', angular.bplus.MobileNationalCtrl)
    .controller('PaidCtrl', angular.bplus.MobilePaidCtrl)
    .controller('SelectPaymentMethodCtrl', angular.bplus.SelectPaymentMethodCtrl)
;