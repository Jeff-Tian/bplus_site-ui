'use strict';

// Declare app level module which depends on views, and components
angular.module('map', [
    'ui.router',
    'ng.utils'
])
    .config([
        '$urlRouterProvider',
        function ($urlRouterProvider) {
        }
    ])
    .run(function () {
    })
    .directive('chinaMap', angular.bplus.chinaMap || {})
;