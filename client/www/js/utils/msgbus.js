'use strict';

angular.module('ng.utils')
    .factory('msgBus', ['$rootScope', function($rootScope) {
        var msgBus = {};
        msgBus.emitMsg = function(msg, data) {
            $rootScope.$emit(msg, data);
        };
        msgBus.onMsg = function(msg, scope, func) {
            var unbind = $rootScope.$on(msg, func);
            scope.$on('$destroy', unbind);
        };
        return msgBus;
    }]);