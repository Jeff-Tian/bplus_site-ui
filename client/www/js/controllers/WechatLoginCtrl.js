(function (exports) {
    exports.WechatLoginCtrl = function ($scope, FormValidation, service, MessageStore, $filter, $sce, queryParser, $timeout, DeviceHelper) {
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
            $('.ui.bottom.attached.tab').closest('[tab]').tab('change tab', 'login');
        };

        // handle Wechat Log On Callback
        var token = queryParser.get('token');

        function forceFillMobileNumber() {
            window.location.href = $scope.localeUrl('/sign-up-from', $scope.language);
        }

        function gotoHomepage() {
            window.location.href = $scope.localeUrl('/');
        }

        if (token) {
            service
                .post('/service-proxy/logon/by-token', {
                    token: token
                })
                .finally(function () {
                    $scope.fetchProfile()
                        .then(function (profile) {
                            if (!profile.mobile) {
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
            var errcode = queryParser.get('errcode');

            if (errcode) {
                $timeout(function () {
                    $scope.$parent.message = $filter('translate')('wechat-' + errcode);
                });
            }
        }

        $scope.invertCancelButtonTheme = $('.b-signin-narrow').length > 0;
    };

    exports.WechatLoginCtrl.$inject = ['$scope', 'FormValidation', 'service', 'MessageStore', '$filter', '$sce', 'queryParser', '$timeout', 'DeviceHelper'];
})(angular.bplus = angular.bplus || {});