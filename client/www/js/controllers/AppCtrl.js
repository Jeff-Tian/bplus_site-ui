(function (exports) {
    exports.AppCtrl = function ($scope, service, MessageStore, msgBus, $translate, $timeout, DeviceHelper, queryParser) {
        $('.checkbox').checkbox();
        $('.ui.menu.b-header-account .ui.dropdown').dropdown();

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

        // TODO: Move to service.js
        $scope.serviceUrls = {
            checkNationalGame2015OrderPayment: '/service-proxy/payment/create-order/national-game-2015/check-has-right',
            logonByToken: '/service-proxy/logon/by-token'
        };

        $scope.showQRCode = document.cookie.indexOf("source=wechatServiceAccount") === -1;

        var prefilledRedemptionCode = queryParser.get('redemption_code');
        if (prefilledRedemptionCode) {
            DeviceHelper.setCookie('pre_redemption_code', prefilledRedemptionCode);
        }
        var partner = queryParser.get('partner');
        if (partner) {
            DeviceHelper.setCookie('partner', partner);
        } else {
            DeviceHelper.setCookie('partner', '');
        }
    };

    exports.AppCtrl.$inject = ['$scope', 'service', 'MessageStore', 'msgBus', '$translate', '$timeout', 'DeviceHelper', 'queryParser'];
})(angular.bplus = angular.bplus || {});