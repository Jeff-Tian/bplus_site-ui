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
                url: '/select-payment-method/:paidBy/:kind',
                templateUrl: 'select-payment-method.html',
                controller: 'SelectPaymentMethodCtrl'
            })
            .state('continue-paying', {
                url: '/continue-paying/:paymentMethod/:kind',
                templateUrl: 'select-payment-method.html',
                controller: 'SelectPaymentMethodCtrl'
            })
            .state('select-interest', {
                url: '/select-interest/:who/:displayName/:redemptionCode',
                templateUrl: 'interest.html',
                controller: 'SelectInterestCtrl'
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
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('queryParser', angular.bplus.queryParser)
    .factory('WechatWrapper', angular.bplus.WechatWrapper)
    .factory('WechatLogon', angular.bplus.WechatLogon)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('SelectInterestCtrl', angular.bplus.SelectInterestCtrl)
    .controller('SelectPaymentMethodCtrl', angular.bplus.SelectPaymentMethodCtrl)
    .controller('PaidCtrl', angular.bplus.MobilePaidCtrl)
;