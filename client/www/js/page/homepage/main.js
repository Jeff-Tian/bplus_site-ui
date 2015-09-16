'use strict';

// Declare app level module which depends on views, and components
angular.module('mates', [
    'ui.router',
    'ng.utils'
]).config([
    '$urlRouterProvider',
    function($urlRouterProvider) {}
]).run(function() {

});

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
    $('.masthead-carousel').owlCarousel({
        items: 1,
        lazyLoad: false,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        animateIn: 'b-pulse',
        navText: ['<i class="angle left icon"></i>', '<i class="angle right icon"></i>'],
        onTranslate: function() {
            // $('.masthead-carousel').removeClass('animated pulse');
            $('.owl-carousel').find('h1').removeClass('animated b-fadeInLeft');
            $('.owl-carousel').find('h2').removeClass('animated b-fadeInRight');
            //$('.masthead-carousel').removeClass('animated b-pulse');

            setTimeout(function(){
                $('.masthead-carousel').addClass('animated b-pulse');
            },1);
            setTimeout(function() {
                $('.active').find('h1').addClass('animated b-fadeInLeft');
                $('.active').find('h2').addClass('animated b-fadeInRight');
            }, 100);
            setTimeout(function() {
                $('.owl-carousel').find('h1').removeClass('animated b-fadeInLeft');
                $('.owl-carousel').find('h2').removeClass('animated b-fadeInRight');
            }, 1100);
            setTimeout(function(){
                $('.masthead-carousel').removeClass('animated b-pulse');
            },3001);
        }
    });

    $('.feedback-carousel').owlCarousel({
        items: 1,
        lazyLoad:true,
        loop:true,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        nav: true,
        navRewind: true,
        animateIn: 'bounceInRight',
        animateOut: 'bounceOutLeft',
        navText: ['<i class="angle left icon"></i>', '<i class="angle right icon"></i>'],
    });
    

    

    var client=$('#b-client-list');
    client.owlCarousel({
        loop:true,
        lazyLoad:true,
        responsiveClass:true,
        nav: false,
        dots: false,
        autoplay: true,
        navRewind: true,
        autoplayTimeout: 6000,
        slideBy: 'page',
        responsive:{
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            767: {
                items: 3,
            },
            991: {
                items: 4,
            },
            1199: {
                items: 5,
            }
        }
    });

    $('.b-client').mouseover(function() {
        $('#b-client-header').css('visibility','visible');
    }).mouseout(function() {
        $('#b-client-header').css('visibility','hidden');
    });

    var animateGif = function() {

        if ($('.online-gif').find('img').attr('src') === "img/salespage/gif/online.png") {
            $('.online-gif').find('img').attr('src','img/salespage/gif/online-animate.gif');
            $('.top-gif').find('img').attr('src','img/salespage/gif/top-animate.gif');
            $('.enhance-gif').find('img').attr('src','img/salespage/gif/enhance-animate.gif');

            setTimeout(function() {
                $('.online-gif').find('img').attr('src','img/salespage/gif/online.png');
                $('.top-gif').find('img').attr('src','img/salespage/gif/top.png');
                $('.enhance-gif').find('img').attr('src','img/salespage/gif/enhance.png');
            }, 950);
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