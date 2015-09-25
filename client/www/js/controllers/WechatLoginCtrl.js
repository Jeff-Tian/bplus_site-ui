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
        var query = window.location.search || window.location.hash;

        function getValueFromQuery(query, key) {
            var index = query.indexOf(key);
            if (index >= 0) {
                var end = query.indexOf('&', index + key.length);

                if (end < 0) {
                    end = query.length;
                }

                var value = query.substring(index + key.length + 1, end);
                return value;
            } else {
                return '';
            }
        }

        if (query) {
            var value = getValueFromQuery(query, 'token');
            if (value) {
                var now = new Date();
                now.setUTCFullYear(now.getUTCFullYear() + 1);

                var cookie = 'token=' + value + '; path=/; expires=' + now.toUTCString();
                console.log(cookie);

                document.cookie = cookie;

                window.location.href = '/';
            } else {
                var errcode = getValueFromQuery(query, 'errcode');
                if (errcode) {
                    $scope.$parent.message = $filter('translate')('wechat-' + errcode);
                }
            }
        }

        $scope.invertCancelButtonTheme = $('.b-signin-narrow').length > 0;
    };

    exports.WechatLoginCtrl.$inject = ['$scope', 'FormValidation', 'service', 'MessageStore', '$filter', '$sce'];
})(angular.bplus = angular.bplus || {});