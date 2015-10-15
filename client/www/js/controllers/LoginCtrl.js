(function (exports) {
    exports.LoginCtrl = function ($scope, FormValidation, service, MessageStore, $filter, DeviceHelper) {
        $scope.loginData = {
            mobile: '',
            password: '',
            rememberMe: false
        };

        var $loginForm = $('.ui.form.login');

        $scope.isLoginFormValid = function () {
            if ($scope.loginForm.$pristine) {
                return false;
            }

            return $loginForm.form('is valid');
        };

        var submitting = false;
        $scope.tryLogin = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            if (submitting) {
                return;
            }

            if (!$scope.isLoginFormValid()) {
                return;
            }

            submitting = true;
            service.post('/service-proxy/logon/authentication', {
                value: $scope.loginData.mobile,
                password: $scope.loginData.password,
                remember: $scope.loginData.rememberMe
            }).then(function (res) {
                MessageStore.set($filter('translate')('SignedInWelcomeMessage'));

                window.location.href = '/' + angular.bplus.localeHelper.getLocale(window.location.pathname);
            }).catch(FormValidation.delegateHandleFormError($loginForm)).finally(function () {
                submitting = false;
            });
        };

        var logging = false;
        $scope.logOnViaWechat = function () {
            if (!DeviceHelper.isInWechatBrowser()) {
                $('.ui.bottom.attached.tab').closest('[tab]').tab('change tab', 'wechat-logon');
            } else {
                if ($scope.$parent.oAuthLink) {
                    window.location.href = $scope.$parent.oAuthLink;
                } else {
                    service.executePromiseAvoidDuplicate(logging, function () {
                        return service
                            .post('/service-proxy/logon/from-wechat', {
                                returnUrl: DeviceHelper.getCurrentUrlWithoutQueryStringNorHash()
                            })
                            .then(function (res) {
                                $scope.$parent.oAuthLink = res;
                                window.location.href = $scope.$parent.oAuthLink;
                            });
                    });
                }
            }
        };
    };

    exports.LoginCtrl.$inject = ['$scope', 'FormValidation', 'service', 'MessageStore', '$filter', 'DeviceHelper'];
})(angular.bplus = angular.bplus || {});