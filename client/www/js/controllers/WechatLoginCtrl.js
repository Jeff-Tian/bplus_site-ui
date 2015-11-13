(function (exports) {
    exports.WechatLoginCtrl = function ($scope, FormValidation, service, MessageStore, $filter, $sce, queryParser, $timeout, DeviceHelper) {
        var moduleTrack = new window.ModuleTrack(DeviceHelper.isMobile() ? 'm.login' : 'login');

        function handleWechatLogOnCallback() {
            var token = queryParser.get('token');
            var registered = queryParser.get('is_registed');

            function forceFillMobileNumber() {
                window.location.href = $scope.localeUrl('/sign-up-from', $scope.language);
            }

            function gotoHomepage() {
                window.location.href = $scope.localeUrl('/');
            }

            function bindRegisteredMobileByWechatToken(token, serverResponse) {
                window.location.href = $scope.localeUrl('/sign-in?wechat_token=' + token + '&server_response=' + window.btoa(serverResponse));
            }

            if (token) {
                if (/^true$/i.test(registered)) {
                    service
                        .post('/service-proxy/logon/by-token', {
                            token: token,
                            return_url: queryParser.get('return_url')
                        })
                        .finally(function () {
                            $scope.fetchProfile()
                                .then(function (profile) {
                                    if (profile.member_id && !profile.mobile) {
                                        forceFillMobileNumber();
                                    } else {
                                        gotoHomepage();
                                    }
                                })
                                .catch(function () {
                                    gotoHomepage();
                                });
                        });
                } else {
                    bindRegisteredMobileByWechatToken(token, queryParser.getQueryString());
                }
            } else {
                var errcode = queryParser.get('errcode');

                if (errcode) {
                    $timeout(function () {
                        $scope.$parent.message = $filter('translate')('wechat-' + errcode);
                    });
                }
            }
        }

        if (angular.bplus.config.featureSwitcher.enableWechat !== true) {
            return;
        }

        var opening = false;
        $scope.logOnViaWechat = function () {
            service.executePromiseAvoidDuplicate(opening, function () {
                return service
                    .post('/service-proxy/logon/by-wechat', {
                        returnUrl: DeviceHelper.getCurrentUrlWithoutQueryStringNorHash()
                    })
                    .then(function (res) {
                        $scope.wechatQRPage = $sce.trustAsResourceUrl(res);
                    });
            });
        };

        var logging = false;
        $scope.logOnFromWechat = function () {
            service.executePromiseAvoidDuplicate(logging, function () {
                return service
                    .post('/service-proxy/logon/from-wechat', {
                        returnUrl: DeviceHelper.getCurrentUrlWithoutQueryStringNorHash()
                    })
                    .then(function (res) {
                        $scope.$parent.oAuthLink = res;
                    });
            });
        };

        if (!DeviceHelper.isInWechatBrowser()) {
            $scope.logOnViaWechat();
        } else {
            $scope.logOnFromWechat();
        }

        $scope.cancelWechatLogin = function () {
            moduleTrack.send('cancel.click');
            $('.ui.bottom.attached.tab').closest('[tab]').tab('change tab', 'login');
        };

        handleWechatLogOnCallback();

        $scope.invertCancelButtonTheme = $('.b-signin-narrow').length > 0;
    };

    exports.WechatLoginCtrl.$inject = ['$scope', 'FormValidation', 'service', 'MessageStore', '$filter', '$sce', 'queryParser', '$timeout', 'DeviceHelper'];
})(angular.bplus = angular.bplus || {});