(function (exports) {
    exports.AppCtrl = function ($scope, service, MessageStore, msgBus, $translate, $timeout, DeviceHelper, queryParser, WechatLogon, $filter) {
        $('.checkbox').checkbox();
        $('.ui.menu.b-header-account .ui.dropdown').dropdown();

        $scope.wechatSigningIn = false;
        function tryHandleWechatLogonCallback() {
            $scope.wechatSigningIn = true;

            function forceFillMobileNumber() {
                window.location.href = $scope.localeUrl('/sign-up-from', $scope.language);
            }

            function bindRegisteredMobileByWechatToken(token, serverResponse) {
                window.location.href = $scope.localeUrl('/sign-in?wechat_token=' + token + '&server_response=' + window.btoa(serverResponse));
            }

            WechatLogon.tryHandleCallback(bindRegisteredMobileByWechatToken, function () {
                window.location.href = window.location.origin + window.location.pathname + window.location.hash;
                $scope.wechatSigningIn = false;
                
                //$scope.fetchProfile()
                //    .then(function (profile) {
                //        if (profile.member_id && !profile.mobile) {
                //            forceFillMobileNumber();
                //        }
                //
                //        //window.alert(JSON.stringify(profile) + '    ' + window.location.href);
                //    })
                //    .finally(function () {
                //        $scope.wechatSigningIn = false;
                //    })
                //;
            }, function (errcode) {
                $scope.wechatSigningIn = false;

                $timeout(function () {
                    $scope.message = $filter('translate')('wechat-' + errcode);
                });
            }, function () {
                $scope.wechatSigningIn = false;
            });
        }

        $scope.$watch('wechatSigningIn', function (newValue, oldValue) {
            if (newValue) {
                $('.wechat-modal').modal('show');
            } else {
                $('.wechat-modal').modal('hide');
            }
        });

        tryHandleWechatLogonCallback();

        $scope.memberInfo = {};

        $scope.fetchProfile = function () {
            return service.get('/service-proxy/member/profile/')
                .then(function (res) {
                    $scope.memberInfo = res;
                    $scope.memberLoaded = true;

                    $scope.memberInfo.displayName = res.nick_name || res.name || res.real_name || res.mobile || res.wechat;

                    msgBus.emitMsg(msgBus.events.profile.loaded);

                    if ($scope.message) {
                        $scope.message = $scope.message.replace('{user.name}', $scope.memberInfo.displayName);
                    }

                    return $scope.memberInfo;
                });
        };

        $scope.$watch('message', function (newValue, oldValue) {
            if (newValue) {
                $timeout(function () {
                    $scope.message = '';
                }, 3000);
            }
        });

        $scope.localeUrl = function (url, locale) {
            locale = locale || $scope.language;

            if (locale) {
                url = '/' + locale + url;
            }

            return url;
        };

        $scope.fetchProfile();

        $scope.message = MessageStore.flash();

        $scope.language = $translate.preferredLanguage();

        $scope.signOut = function () {
            service.post('/service-proxy/logon/logout')
                .finally(function (res) {
                    window.location.href = $scope.localeUrl('/');
                });
        };

        function locationHashChanged() {
            $scope.$apply(function () {
                $scope.hash = window.location.hash;
            });
        }

        $scope.hash = window.location.hash;
        window.addEventListener('load', locationHashChanged);
        window.addEventListener('hashchange', function () {
            locationHashChanged();
        });

        msgBus.onMsg(msgBus.events.profile.updated, $scope, $scope.fetchProfile);

        $scope.showQRCode = document.cookie.indexOf("source=wechatServiceAccount") === -1;

        var prefilledRedemptionCode = queryParser.get('redemption_code');
        if (prefilledRedemptionCode) {
            DeviceHelper.setCookie('pre_redemption_code', prefilledRedemptionCode);
        }
        var partner = queryParser.get('partner');
        if (partner) {
            DeviceHelper.setCookie('partner', partner);
        }
    };

    exports.AppCtrl.$inject = ['$scope', 'service', 'MessageStore', 'msgBus', '$translate', '$timeout', 'DeviceHelper', 'queryParser', 'WechatLogon', '$filter'];
})(angular.bplus = angular.bplus || {});