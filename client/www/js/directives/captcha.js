(function (exports) {
    exports.captcha = function ($http) {
        var captchaServiceDomain = 'http://' + angular.bplus.config.captcha.host + ':' + angular.bplus.config.captcha.port;

        return {
            restrict: 'A',
            require: 'ngModel',
            template: '<img ng-src="{{captchaImageUrl}}" ng-click="refreshCaptcha()">',
            link: function ($scope, $element, attrs, ngModel) {
                function errorHandler(res) {
                    console.error(res);
                }

                function refreshCaptcha(successCallback) {
                    $http({
                        method: 'JSONP',
                        url: captchaServiceDomain + '/captcha/generator/p?callback=JSON_CALLBACK&appid=bplus'
                    }).success(function (response) {
                        if (response.isSuccess !== false) {
                            $scope.captchaImageUrl = captchaServiceDomain + response.result.url;
                            ngModel.$setViewValue(response.result.id);

                            if (typeof successCallback === 'function') {
                                successCallback();
                            }
                        } else {
                            errorHandler(response);
                        }
                    }).error(errorHandler);
                }

                $scope.refreshCaptcha = refreshCaptcha;

                refreshCaptcha();
            }
        };
    };

    exports.captcha.$inject = ['$http'];
})(angular.bplus = angular.bplus || {});