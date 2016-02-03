angular
    .module('opdModule', [
        'ng.utils',
        'pascalprecht.translate',
        'ui.router',
        'chart.js'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var states = ['home', 'job', 'favorite', 'recommended-positions', 'applied-positions', 'training'];

        $urlRouterProvider.otherwise('/' + states[0]);

        for (var i = 0; i < states.length; i++) {
            var state = states[i];

            $stateProvider
                .state(state, {
                    url: '/' + state,
                    templateUrl: state + '.html'
                });
        }
    }])
    .config(angular.bplus.translate)
    .run(['$rootScope', function ($rootScope) {
        $rootScope.cdn = angular.bplus.config.cdn;
    }])
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .controller('OpdMenuCtrl', angular.bplus.OpdMenuCtrl)
    .controller('OpdCtrl', angular.bplus.OpdCtrl)
    .factory('PipeCacheService', angular.bplus.PipeCacheService)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('service', angular.bplus.service)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('WechatLogon', angular.bplus.WechatLogon)
    .factory('queryParser', angular.bplus.queryParser)
;