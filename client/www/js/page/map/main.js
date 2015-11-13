'use strict';

// Declare app level module which depends on views, and components
angular.module('bplus', [
    'ng.utils',
    'pascalprecht.translate'
])
    .config(angular.bplus.translate)
    .config(angular.bplus.xhr)
    .factory('translationLoader', angular.bplus.translationLoader)
    .factory('service', angular.bplus.service)
    .factory('FormValidation', angular.bplus.FormValidation || function() {
        return {};
    })
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('queryParser', angular.bplus.queryParser)
    .directive('chinaMap', angular.bplus.chinaMap || {})
    .directive('radarMap', angular.bplus.radarMap || {})
    .directive('gameHome', angular.bplus.gameHome)
    .directive('gameOfficial', angular.bplus.gameOfficial)
    .directive('gameNational', angular.bplus.gameNational)
    .directive('gameSeason', angular.bplus.gameSeason)
    .directive('gamePersonalRecord', angular.bplus.gamePersonalRecord)
    .directive('gameRankingList', angular.bplus.gameRankingList)
    .controller('gameCtrl', angular.bplus.gameCtrl)
    .directive('loading', angular.bplus.loading)
;
(function() {
})();