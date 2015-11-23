(function (exports) {
    exports.WechatLogon = function (service, queryParser, DeviceHelper) {
        return {
            sendRequest: function (logging) {
                return service.executePromiseAvoidDuplicate(logging, function () {
                    var data = {
                        returnUrl: (window.location.protocol + '//' + window.location.host + decodeURIComponent(queryParser.get('return_url'))) || DeviceHelper.getCurrentUrlWithoutQueryStringNorHash()
                    };

                    var partner = queryParser.get('partner') || DeviceHelper.getCookie('partner');
                    if (partner) {
                        data.partner = partner.toString().toLowerCase();
                    }

                    return service
                        .post(angular.bplus.config.serviceUrls.logOnFromWechat, data)
                        ;
                });
            },

            tryHandleCallback: function (callbackForNewWechatUser, signedInCallback, errorCallback, notWechatCallback) {
                var token = queryParser.get('token');
                var registered = queryParser.get('is_registed');

                if (token) {
                    if (/^true$/i.test(registered)) {
                        service
                            .post(angular.bplus.config.serviceUrls.logOnByToken, {
                                token: token,
                                return_url: queryParser.get('return_url')
                            })
                            .finally(signedInCallback);
                    } else {
                        callbackForNewWechatUser(token, queryParser.getQueryString());
                    }
                } else {
                    var errcode = queryParser.get('errcode');

                    if (errcode) {
                        errorCallback(errcode);
                    } else {
                        if (typeof notWechatCallback === 'function') {
                            notWechatCallback();
                        }
                    }
                }
            }
        };
    };

    exports.WechatLogon.$inject = ['service', 'queryParser', 'DeviceHelper'];
})(angular.bplus = angular.bplus || {});