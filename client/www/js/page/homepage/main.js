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
    .factory('FormValidation', angular.bplus.FormValidation)
    .factory('queryParser', angular.bplus.queryParser)
    .factory('MessageStore', angular.bplus.MessageStore)
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('queryParser', angular.bplus.queryParser)
    .factory('WechatLogon', angular.bplus.WechatLogon)
    .directive('loading', angular.bplus.loading)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .directive('captcha', angular.bplus.captcha)
    .directive('registerForm', angular.bplus.registerForm)
    .directive('tab', angular.bplus.tab)
    .controller('LoginCtrl', angular.bplus.LoginCtrl)
    .controller('WechatLoginCtrl', angular.bplus.WechatLoginCtrl)
    .controller('SignUpCtrl', angular.bplus.SignUpCtrl)
;

// TODO: integrated into JS framework
(function () {
    setTimeout(function () {
        // preload image
        var toBeLoaded = ["img/client/1x/tencent.png", "img/client/1x/cocacola.png", "img/client/1x/huawei.png", "img/client/1x/tsinghua.png", "img/client/1x/ceibs.png", "img/client/1x/cas.png"];
        for (var i = 0; i < toBeLoaded.length; i++) {
            new Image().src = angular.bplus.config.cdn.normal + toBeLoaded[i] + '?' + angular.bplus.config.cdn.version;
        }
    }, 1000);


    $('.b-masthead').visibility({
        once: false,
        onBottomPassed: function () {
            $('[data-action=fixedHeader]').transition('fade in');
        },
        onBottomPassedReverse: function () {
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


    var client = $('#b-client-list');
    client.owlCarousel({
        loop: true,
        lazyLoad: true,
        responsiveClass: true,
        nav: false,
        dots: false,
        autoplay: true,
        navRewind: true,
        autoplayTimeout: 6000,
        slideBy: 'page',
        responsive: {
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

    $('.b-client').mouseover(function () {
        $('#b-client-header').css('visibility', 'visible');
    }).mouseout(function () {
        $('#b-client-header').css('visibility', 'hidden');
    });
})();