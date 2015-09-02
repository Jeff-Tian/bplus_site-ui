(function (exports) {
    exports.captcha = function ($http) {
        var captchaServiceDomain = 'http://10.20.32.51:10001';

        return {
            restrict: 'A',
            require: 'ngModel',
            template: '<img ng-src="{{captchaImageUrl}}" ng-click="refreshCaptcha()">',
            link: function ($scope, $element, attrs, ngModel) {
                function errorHandler(res) {
                    console.error(res);
                }

                function refreshCaptcha() {
                    $http({
                        method: 'JSONP',
                        url: captchaServiceDomain + '/captcha/generator/p?callback=JSON_CALLBACK&appid=bplus'
                    }).success(function (response) {
                        if (response.isSuccess !== false) {
                            $scope.captchaImageUrl = captchaServiceDomain + response.result.url;
                            ngModel.$setViewValue(response.result.id);
                        } else {
                            errorHandler();
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