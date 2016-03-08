'use strict';

// Declare app level module which depends on views, and components
angular.module('personalHistory', ['bplusModule'])
    .factory('FormValidation', angular.bplus.FormValidation)
    .directive('autoComplete', angular.bplus.autoComplete)
    .controller('PersonalHistoryCtrl', angular.bplus.PersonalHistoryCtrl)
    .directive('dropdown', angular.bplus.dropdown)
;