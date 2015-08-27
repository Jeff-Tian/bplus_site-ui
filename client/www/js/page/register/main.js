'use strict';

// Declare app level module which depends on views, and components
angular.module('register', [
    'ui.router',
    'ng.utils'
])
    .config([
        '$urlRouterProvider',
        function ($urlRouterProvider) {
        }
    ])
    .run(function () {

    });

// TODO: integrated into JS framework
(function () {

    // TODO: initial tabs, to be integrated into JS framework
    $('.menu .item')
        .tab({
            //context: '.b-signin-wide .menu .item',
            //history: true
        });
})();