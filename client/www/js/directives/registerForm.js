(function (exports) {
    exports.registerForm = function (FormValidation, $timeout, service) {
        return {
            templateUrl: '../../view-partial/register-form.html',
            scope: {
                action: '=',
                control: '='
            },
            link: function ($scope, element) {
                $scope.signUpData = {
                    mobile: '',
                    captcha: '',
                    verificationCode: '',
                    password: ''
                };

                var validChineseMobileNumberPattern = FormValidation.validChineseMobileNumberPattern;

                var countDownInterval = 60;
                var countDown = countDownInterval;
                $scope.sendCodeButtonClicked = false;

                $scope.verificationCodeButtonText = '';
                function updateButtonText(text) {
                    $scope.verificationCodeButtonText = text;
                }

                function initButtonText() {
                    var message = $scope.sendCodeButtonClicked ? '再次发送' : '获取手机验证码';
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

                function getSignUpForm() {
                    return $('form.b-sign-up');
                }

                function partiallyValidateSignUpForm() {
                    var $form = getSignUpForm();

                    $form.form(angular.extend({}, {
                        fields: {
                            mobile: FormValidation.defaultSetting.mobile,
                            captcha: FormValidation.defaultSetting.captcha
                        },
                        templates: FormValidation.defaultSetting.templates,
                        on: 'blur'
                    }));

                    $form.form('validate form');

                    return $form;
                }

                $scope.isSignUpFormPartiallyValid = function () {
                    return $scope.signUpData.mobile && $scope.signUpData.mobile.match(new RegExp(validChineseMobileNumberPattern)) && $scope.signUpData.captcha;
                };

                $scope.isSignUpFormFullyValid = function () {
                    return $scope.isSignUpFormPartiallyValid() && $scope.signUpData.verificationCode && $scope.signUpData.password;
                };

                $scope.getVerificationCode = function () {
                    partiallyValidateSignUpForm();

                    if ($scope.isSignUpFormPartiallyValid()) {
                        service.post('/service-proxy/sms/send', $scope.signUpData)
                            .then(function (res) {
                                pollUpdateButtonText(function () {
                                    $scope.refreshCaptcha(function () {
                                        $scope.signUpData.captcha = '';
                                    });
                                });
                                $scope.sendCodeButtonClicked = true;
                            }).catch($scope.internalCtrl.handleFormError);
                    }
                };

                $scope.trySignUp = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    if (!$scope.isSignUpFormFullyValid()) {
                        return;
                    }

                    $scope.action();
                };

                getSignUpForm().form(angular.extend({}, FormValidation.defaultSetting, {
                    on: 'blur'
                }));

                $scope.internalCtrl = $scope.control || {};

                $scope.internalCtrl.handleFormError = function (reason) {
                    FormValidation.handleFormError(getSignUpForm(), reason);
                };

                $scope.internalCtrl.getFormData = function () {
                    return $scope.signUpData;
                };

                $scope.internalCtrl.getForm = function () {
                    return getSignUpForm();
                };
            }
        };
    };

    exports.registerForm.$inject = ['FormValidation', '$timeout', 'service'];
})(angular.bplus = angular.bplus || {});