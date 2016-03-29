angular.module('bridgeplus.corp')
    .factory('serviceErrorParser', ['$filter', '$rootScope', function ($filter, $rootScope) {
        var o = {};

        o.getErrorMessage = function (reason) {
            console.log('error!', reason);
            var errorCode = 'service-' + reason.code;
            var errorMessage = $filter('translate')(errorCode);
            if (errorMessage === errorCode || !errorMessage) {
                errorMessage = reason.message;
            }

            if (!errorMessage && typeof reason === 'string') {
                errorMessage = reason;
            }

            return errorMessage;
        };

        o.handleError = function (reason) {
            $rootScope.message = o.getErrorMessage(reason);
        };

        o.handleFormError = function (reason) {
            $rootScope.errorMessages = [o.getErrorMessage(reason)];
        };

        return o;
    }])
;