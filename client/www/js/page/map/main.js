'use strict';

// Declare app level module which depends on views, and components
angular.module('bplus', [
    'ui.router',
    'ng.utils',
    'pascalprecht.translate'
])
    .config([
        '$urlRouterProvider',
        function($urlRouterProvider) {}
    ])
    .run(function() {})
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('service', angular.bplus.service)
    .factory('FormValidation', angular.bplus.FormValidation || function() {
        return {};
    })
    .factory('MessageStore', angular.bplus.MessageStore)
    .directive('chinaMap', angular.bplus.chinaMap || {})
    .directive('gameHome', angular.bplus.gameHome)
    .directive('gameOfficial', angular.bplus.gameOfficial)
    .directive('gameNational', angular.bplus.gameNational)
    .directive('gameSeason', angular.bplus.gameSeason)
    .directive('gamePersonalRecord', angular.bplus.gamePersonalRecord)
    .directive('gameRankingList', angular.bplus.gameRankingList)
    .controller('gameCtrl', angular.bplus.gameCtrl)

;
(function() {
    $('.official-card').dimmer({
        on: 'click'
    });
    $('.card').dimmer({
        on: 'click'
    });
})();