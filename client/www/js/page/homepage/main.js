'use strict';

// Declare app level module which depends on views, and components
angular.module('bplus', [
    'ui.router',
    'ng.utils'
]).config([
    '$urlRouterProvider',
    function($urlRouterProvider) {}
]).run(function() {

}).factory('service', angular.bplus.service)
    .factory('FormValidation', angular.bplus.FormValidation)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    ;

// TODO: integrated into JS framework
(function() {
    //$(document)
    //  .ready(function() {
    // fix header when passed
    $('.b-masthead').visibility({
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

    // TODO: initial carousel, to be integrated into JS framework
    $('[data-action=carousel]').owlCarousel({
        singleItem: true,
        lazyLoad: true,
        loop: true,
        autoPlay: false,
        // autoplayTimeout: 10000,
        // stopOnHover: true,
        navigation: true,
        stopOnHover: true,
        rewindSpeed: 100,
        addClassActive: true,
        navigationText: ['<i class="angle left icon"></i>', '<i class="angle right icon"></i>'],
        beforeMove: function() {
            $('.owl-carousel').find('h1').removeClass('animated fadeInLeft');
            $('.owl-carousel').find('h2').removeClass('animated fadeInRight');
        },
        afterMove: function() {
            $('.active').find('h1').addClass('animated fadeInLeft');
            $('.active').find('h2').addClass('animated fadeInRight');
            setTimeout(function() {
                $('.owl-carousel').find('h1').removeClass('animated fadeInLeft');
                $('.owl-carousel').find('h2').removeClass('animated fadeInRight');
            }, 600);

        }
    });

    var animateGif = function() {

        if ($('.online-gif').find('img').attr('src') === "img/salespage/gif/online.png") {
            $('.online-gif').html("<img src='img/salespage/gif/online-animate.gif' width='100%'>");
            $('.top-gif').html("<img src='img/salespage/gif/top-animate.gif' width='100%'>");
            $('.enhance-gif').html("<img src='img/salespage/gif/enhance-animate.gif' width='100%'>");
            setTimeout(function() {
                $('.online-gif').html("<img src='img/salespage/gif/online.png' width='100%'>");
                $('.top-gif').html("<img src='img/salespage/gif/top.png' width='100%'>");
                $('.enhance-gif').html("<img src='img/salespage/gif/enhance.png' width='100%'>");
            }, 500);
        }
    };

    $('.index-gif').visibility({
        once: false,
        onTopVisible: function() {
            animateGif();
        },
        onBottomPassedReverse: function() {
            animateGif();
        }
    });


})();