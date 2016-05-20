angular.module('linkedInModule', ['servicesModule', 'bplusConfigModule'])
    .controller('linkedInLogInCtrl', ['$scope', 'service', '$rootScope', 'bplusConfig', function ($scope, service, $rootScope, bplusConfig) {
        var popup = null;
        $scope.doing = false;

        $scope.newWindowOpened = function () {
            return popup && !popup.closed;
        };

        $scope.logOnViaLinkedIn = function () {
            if (!popup || popup.closed) {
                popup = window.open('/message-listener');

                window.addEventListener('message', function (event) {
                    if (event.data === 'listenerLoaded') {
                        gotoLinkedInOAuthWindow();
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

                            alert('之前打开的窗口已关闭, 请重新点击并在新打开的窗口中重试。')
                        } finally {
                            popup.postMessage(result, window.location.origin);
                        }
                    });
                });
            }
        };
    }])
;