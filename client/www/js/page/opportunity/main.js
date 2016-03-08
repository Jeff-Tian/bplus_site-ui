'use strict';

// Declare app level module which depends on views, and components
angular.module('bplus', ['bplusModule'])
    .factory('FormValidation', angular.bplus.FormValidation || function () {
        return {};
    })
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