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
    .factory('DeviceHelper', angular.bplus.DeviceHelper)
    .factory('MessageStore', angular.bplus.MessageStore)
    .controller('AppCtrl', angular.bplus.AppCtrl)
;
(function() {
    $('.b-opportunity-masthead').visibility({
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
})();