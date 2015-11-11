(function (exports) {
    exports.LoginCtrl = function ($scope, FormValidation, service, MessageStore, $filter, DeviceHelper, queryParser) {

        $('.ui.checkbox.remember-me').checkbox({
            'onChecked': function () {
                var ngModel = $(this).attr('ng-model');
                var ngModels = ngModel.split('.');
                $scope[ngModels[0]][ngModels[1]] = true;
            },
            onUnchecked: function () {
                var ngModel = $(this).attr('ng-model');
                var ngModels = ngModel.split('.');
                $scope[ngModels[0]][ngModels[1]] = false;
            }
        });

        $scope.loginData = {
            mobile: '',
            password: '',
            rememberMe: false,
            wechatToken: queryParser.get('wechat_token')
        };

        var moduleTrack = new window.ModuleTrack(
            DeviceHelper.isMobile() ? 'm.login' : 'login',
            function(sender, args){
                if (args.hash === 'login') {
                    moduleTrack.send(null, {checkAutoLogin: $scope.loginData.rememberMe});
                }
            });

        var hash = moduleTrack.currentHash();
        if (!hash || hash === 'login') {
            moduleTrack.send(null, {checkAutoLogin: $scope.loginData.rememberMe});
        }

        var serverResponse = queryParser.get('server_response');
        if (serverResponse) {
            console.log(serverResponse);
            console.log(window.atob(serverResponse));
        }

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
                remember: $scope.loginData.rememberMe,
                wechat_token: $scope.loginData.wechatToken,
                return_url: queryParser.get('return_url')
            }).then(function (res) {
                moduleTrack.send('login.click', {isLoginSuc: true, checkAutoLogin: $scope.loginData.rememberMe});

                MessageStore.set($filter('translate')('SignedInWelcomeMessage'));
                window.location.href = '/' + angular.bplus.localeHelper.getLocale(window.location.pathname);
            }).catch(function (reason) {
                FormValidation.delegateHandleFormError($loginForm)(reason);

                moduleTrack.send('login.click', {isLoginSuc: false, checkAutoLogin: $scope.loginData.rememberMe});
            }).finally(function () {
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

    exports.LoginCtrl.$inject = ['$scope', 'FormValidation', 'service', 'MessageStore', '$filter', 'DeviceHelper', 'queryParser'];
})(angular.bplus = angular.bplus || {});