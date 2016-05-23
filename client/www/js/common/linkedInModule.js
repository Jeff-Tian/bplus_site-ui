angular.module('linkedInModule', ['servicesModule', 'bplusConfigModule', 'angularQueryParserModule'])
    .controller('linkedInLogInCtrl', ['$scope', 'service', '$rootScope', 'bplusConfig', 'queryParser', function ($scope, service, $rootScope, bplusConfig, queryParser) {
        var popup = null;
        $scope.doing = false;

        $scope.linkedInWorking = function () {
            if (newWindowOpened()) {
                return true;
            }

            return $scope.doing;
        };

        function newWindowOpened() {
            return popup && !popup.closed;
        }

        function getReturnUrl() {
            var hash = window.location.hash;
            var index = hash.indexOf('?');

            if (index >= 0) {
                hash = hash.substr(0, index);
            }

            return window.location.pathname + hash;
        }

        function getJumpUrl(linkedInData) {
            var jumpUrl = '/sign-in?linked_in_token=' + linkedInData.token + '&linked_in_profile=' + linkedInData.profile + '&linked_in_is_registered=' + linkedInData.is_registed;

            var returnUrl = getReturnUrl();

            if (returnUrl.indexOf('bind-mobile') < 0) {
                jumpUrl += '&return_url=' + encodeURIComponent(returnUrl);
            }

            return jumpUrl;
        }

        function registerWithLinkedInProfile(linkedInData) {
            window.location.href = getJumpUrl(linkedInData);
        }

        function logonWithLinkedInToken(result) {
            service.executePromiseAvoidDuplicate($scope, 'doing', function () {
                return service.post(bplusConfig.serviceUrls.linkedIn.logonByToken.frontEnd, {
                    token: result.token,
                    return_url: location.href
                });
            });
        }

        function handleLinkedInCallback(result) {
            if (!/^true$/i.test(result.is_registed)) {
                return registerWithLinkedInProfile(result);
            }

            return logonWithLinkedInToken(result);
        }

        $scope.logOnViaLinkedIn = function () {
            if (!popup || popup.closed) {
                popup = window.open('/message-listener');

                window.addEventListener('message', function (event) {
                    if (!event.data) {
                        // Ignore the redirecting messages.
                        return;
                    }

                    if (event.data === 'listenerLoaded') {
                        return gotoLinkedInOAuthWindow();
                    }

                    if (event.data.indexOf('?') === 0) {
                        var result = queryParser.parse(event.data);
                        console.log(result);

                        handleLinkedInCallback(result);

                        return popup.close();
                    }
                }, false);
            }

            gotoLinkedInOAuthWindow();

            function gotoLinkedInOAuthWindow() {
                service.executePromiseAvoidDuplicate($scope, 'doing', function () {
                    return service.post(bplusConfig.serviceUrls.linkedIn.oauth.frontEnd, {
                        returnUrl: window.location.origin + '/linked-in/oauth/callback'
                    }).then(function (result) {
                        try {
                            var testLink = popup.location.href;
                        } catch (ex) {
                            console.error(ex);
                            popup.close();

                            window.alert('之前打开的窗口已关闭, 请重新点击并在新打开的窗口中重试。');
                        } finally {
                            popup.postMessage(result, window.location.origin);
                        }
                    });
                });
            }
        };
    }])
    .factory('linkedInLogOn', ['service', 'bplusConfig', 'queryParser', function (service, bplusConfig, queryParser) {
        return {
            bindMobile: function (loginData) {
                return service.post(bplusConfig.serviceUrls.linkedIn.bindMobile.frontEnd, {
                    value: loginData.mobile,
                    password: loginData.password,
                    remember: false,
                    linkedInProfile: loginData.linkedInProfile,
                    return_url: queryParser.get('return_url')
                });
            }
        };
    }])
;