(function (exports) {
    exports.WechatLogon = function (service, queryParser, DeviceHelper, msgBus) {
        function getPartner() {
            return queryParser.get('partner') || DeviceHelper.getCookie('partner');
        }

        return {
            getPartner: getPartner,
            getPartnerName: function () {
                return {
                    "pytui": "朋友推"
                }[getPartner()];
            },
            sendRequest: function (scope, logging) {
                return service.executePromiseAvoidDuplicate(scope, logging, function () {
                    var data = {
                        returnUrl: (window.location.protocol + '//' + window.location.host + decodeURIComponent(queryParser.get('return_url'))) || DeviceHelper.getCurrentUrlWithoutQueryStringNorHash()
                    };

                    var partner = getPartner();
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
                            .finally(function () {
                                signedInCallback();
                                msgBus.notifyWechatLogonCallbackHandled();
                            });
                    } else {
                        callbackForNewWechatUser(token);
                        msgBus.notifyWechatLogonCallbackHandled();
                    }
                } else {
                    var errcode = queryParser.get('errcode');

                    if (errcode) {
                        errorCallback(errcode);
                        msgBus.notifyWechatLogonCallbackHandled();
                    } else {
                        if (typeof notWechatCallback === 'function') {
                            notWechatCallback();
                            msgBus.notifyWechatLogonCallbackHandled();
                        }
                    }
                }
            },

            getQRImageUrl: function () {
                var partner = getPartner();

                if (partner) {
                    return angular.bplus.config.cdn.normal + 'img/wechat/' + partner + '.jpg?' + angular.bplus.config.cdn.version;
                }

                return angular.bplus.config.cdn.normal + 'img/wechat/bplus_fuwuhao.jpg?' + angular.bplus.config.cdn.version;
            }
        };
    };

    exports.WechatLogon.$inject = ['service', 'queryParser', 'DeviceHelper', 'msgBus'];
})(angular.bplus = angular.bplus || {});