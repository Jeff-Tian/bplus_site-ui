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
    .factory('FormValidation', angular.bplus.FormValidation || function () {
        return {};
    })
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('queryParser', angular.bplus.queryParser)
    .directive('loading', angular.bplus.loading)
    .controller('AppCtrl', angular.bplus.AppCtrl)
;
// TODO: integrated into JS framework
(function() {
    //$(document)
    //  .ready(function() {
    // fix header when passed
    $('.footer-main').visibility({
        once: false,
        onBottomPassed: function() {
            $('[data-action=fixedHeader]').transition('fade in');
        },
        onBottomPassedReverse: function() {
            $('[data-action=fixedHeader]').transition('fade out');
        }
    });


    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');
    //  });

    // TODO: initial tabs, to be integrated into JS framework
    $('.menu .item').tab();

        $('.feedback-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        //autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        nav: true,
        navRewind: true,
        smartSpeed: 500,
        // animateIn: 'bounceInRight',
        //animateOut: 'bounceOutLeft',
        navText: ['<i class="angle left icon"></i>', '<i class="angle right icon"></i>']
    });

})();