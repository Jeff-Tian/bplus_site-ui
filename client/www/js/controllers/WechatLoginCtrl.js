(function (exports) {
    exports.WechatLoginCtrl = function ($scope, FormValidation, service, MessageStore, $filter, $sce) {
        var opening = false;
        $scope.logOnViaWechat = function () {
            if (opening) {
                return;
            }

            opening = true;
            service
                .post('/service-proxy/logon/by-wechat', {
                    returnUrl: window.location.href
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
        if (window.location.query) {
            var index = window.location.query.indexOf('token') >= 0;
            if (index >= 0) {
                var end = window.location.query.indexOf('&', index + 5);

                if (end < 0) {
                    end = window.location.query.length;
                }

                var token = window.location.query.substring(index + 5, end);
                var now = new Date();
                now.setUTCFullYear(now.getUTCFullYear());

                document.cookie = 'token=' + '; expires=' + now.toUTCString();

                window.location.href = '/';
            }
        }

        $scope.invertCancelButtonTheme = $('.b-signin-narrow').length > 0;
    };

    exports.WechatLoginCtrl.$inject = ['$scope', 'FormValidation', 'service', 'MessageStore', '$filter', '$sce'];
})(angular.bplus = angular.bplus || {});