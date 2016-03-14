angular.module('bridgeplus.corp')
    .factory('serviceErrorParser', ['$filter', function ($filter) {
        return {
            getErrorMessage: function (reason) {
                var errorCode = 'service-' + reason.code;
                var errorMessage = $filter('translate')(errorCode);
                if (errorMessage === errorCode) {
                    errorMessage = reason.message;
                }

                return errorMessage;
            }
        };
    }])
;