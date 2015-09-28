(function (exports) {
    exports.WechatLoginCtrl = function ($scope, FormValidation, service, MessageStore, $filter, $sce, queryParser, $timeout) {
        var opening = false;
        $scope.logOnViaWechat = function () {
            if (opening) {
                return;
            }

            opening = true;
            service
                .post('/service-proxy/logon/by-wechat', {
                    returnUrl: window.location.protocol + '//' + window.location.host + window.location.pathname
                })
                .then(function (res) {
                    $scope.wechatQRPage = $sce.trustAsResourceUrl(res);
                })
                .finally(function () {
                    opening = false;
                })
            ;
        };

        $scope.logOnViaWechat();

        $scope.cancelWechatLogin = function () {
            $('.ui.bottom.attached.tab').closest('[tab]').tab('change tab', 'login');
        };

        // handle Wechat Log On Callback
        var token = queryParser.get('token');

        if (token) {
            var now = new Date();
            now.setUTCFullYear(now.getUTCFullYear() + 1);

            var cookie = 'token=' + token + '; path=/; expires=' + now.toUTCString();
            console.log(cookie);

            document.cookie = cookie;

            service
                .post('/service-proxy/logon/by-token', {
                    token: token
                })
                .finally(function () {
                    window.location.href = '/';
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

    exports.WechatLoginCtrl.$inject = ['$scope', 'FormValidation', 'service', 'MessageStore', '$filter', '$sce', 'queryParser', '$timeout'];
})(angular.bplus = angular.bplus || {});