(function (exports) {
    exports.captcha = function (service) {
        var captchaServiceDomain = '//' + angular.bplus.config.captcha.host + ':' + angular.bplus.config.captcha.port;

        return {
            restrict: 'A',
            require: 'ngModel',
            template: '<img ng-src="{{captchaImageUrl}}" ng-click="refreshCaptcha()">',
            link: function ($scope, $element, attrs, ngModel) {
                function errorHandler(res) {
                    console.error(res);
                }

                function refreshCaptcha(successCallback) {
                    service.jsonp(captchaServiceDomain + '/captcha/generator/p?callback=JSON_CALLBACK&appid=bplus').then(function (result) {
                        $scope.captchaImageUrl = captchaServiceDomain + result.url;
                        ngModel.$setViewValue(result.id);

                        if (typeof successCallback === 'function') {
                            successCallback();
                        }
                    }).catch(errorHandler);
                }

                $scope.refreshCaptcha = refreshCaptcha;

                refreshCaptcha();
            }
        };
    };

    exports.captcha.$inject = ['service'];
})(angular.bplus = angular.bplus || {});