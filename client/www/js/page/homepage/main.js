'use strict';

// Declare app level module which depends on views, and components
angular.module('mates', [
    'ui.router',
    'ng.utils'
  ])
  .config([
    '$urlRouterProvider',
    function($urlRouterProvider) {}
  ])
  .run(function() {

  });

// TODO: integrated into JS framework
(function() {
  //$(document)
  //  .ready(function() {
  // fix header when passed
  $('.b-masthead')
    .visibility({
      once: false,
      onBottomPassed: function() {
        $('[data-action=fixedHeader]').transition('fade in');
      },
      onBottomPassedReverse: function() {
        $('[data-action=fixedHeader]').transition('fade out');
      }
    });

  // create sidebar and attach to menu open
  $('.ui.sidebar')
    .sidebar('attach events', '.toc.item');
  //  });

  // TODO: initial tabs, to be integrated into JS framework
  $('.menu .item')
    .tab();

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
      setTimeout(function(){
        $('.owl-carousel').find('h1').removeClass('animated fadeInLeft');
        $('.owl-carousel').find('h2').removeClass('animated fadeInRight');
      },600);

    }
  });
})();