'use strict';

// Declare app level module which depends on views, and components
angular
    .module('selectPaymentMethod', [
        'ng.utils',
        'pascalprecht.translate',
        'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/select-payment-method");

        $stateProvider
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
                url: '/paid',
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
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('SelectPaymentMethodCtrl', angular.bplus.SelectPaymentMethodCtrl)
    .controller('PaidCtrl', angular.bplus.MobilePaidCtrl)
;