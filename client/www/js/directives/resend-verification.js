angular.module('bplusModule')
    .directive('resendVerification', ['validChineseMobilePattern', 'service', 'serviceErrorParser', '$rootScope', '$timeout', function (validChineseMobileNumberPattern, service, serviceErrorParser, $rootScope, $timeout) {
        return {
            link: function ($scope, $element, attrs) {
                var countDownInterval = 60;
                var countDown = countDownInterval;

                $scope.verificationCodeButtonText = '';

                function updateButtonText(text) {
                    $scope.verificationCodeButtonText = text;
                }

                function initButtonText() {
                    var message = $scope.verificationSent ? '再次发送' : '获取手机验证码';
                    updateButtonText(message);
                    $scope.allowGetCode = true;
                }

                function refreshButtonText() {
                    updateButtonText(countDown);
                    $scope.allowGetCode = false;
                }

                function pollUpdateButtonText(roundEndCallback) {
                    refreshButtonText();

                    if (countDown > 0) {
                        $timeout(function () {
                            countDown--;
                            pollUpdateButtonText(roundEndCallback);
                        }, 1000);
                    } else {
                        countDown = countDownInterval;
                        initButtonText();

                        if (typeof roundEndCallback === 'function') {
                            roundEndCallback();
                        }
                    }
                }

                initButtonText();

                $scope.sendingVerificationCode = false;
                $scope.verificationSent = false;
                $scope.sendVerificationCode = function () {
                    service.executePromiseAvoidDuplicate($scope, 'sendingVerificationCode', function () {
                        return service.put($rootScope.config.serviceUrls.corp.sms.sendWithCaptcha, {
                            captchaId: $scope.changeMobileData.captchaId,
                            captcha: $scope.changeMobileData.captcha,
                            mobile: $scope.changeMobileData.mobile
                        });
                    })
                        .then(function (result) {
                            $rootScope.message = '短信验证码已发送,请注意查收';
                            $scope.verificationSent = true;

                            pollUpdateButtonText(function () {
                                $scope.refreshCaptcha(function () {
                                    $scope.changeMobileData.captcha = '';
                                });
                            });
                        })
                        .then(null, function (reason) {
                            pollUpdateButtonText(function () {
                                $scope.refreshCaptcha(function () {
                                    $scope.changeMobileData.captcha = '';
                                });
                            });
                            $scope.verificationSent = false;
                            $scope.refreshCaptcha();
                            $scope.changeMobileData.captcha = '';
                            serviceErrorParser.handleFormError(reason);
                        })
                    ;
                };
            }
        };
    }])
;