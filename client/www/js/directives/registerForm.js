(function (exports) {
    exports.registerForm = function (FormValidation, $timeout, $http) {
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
                        on: 'blur',
                        inline: true
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
                        $http.post('/service-proxy/sms/send', $scope.signUpData)
                            .success(function (res) {
                                if (res.isSuccess) {
                                    pollUpdateButtonText(function () {
                                        $scope.refreshCaptcha(function () {
                                            $scope.signUpData.captcha = '';
                                        });
                                    });
                                    $scope.sendCodeButtonClicked = true;
                                } else {
                                    $scope.internalCtrl.handleFormError(res.message);
                                }
                            }).error($scope.internalCtrl.handleFormError);
                    }
                };

                $scope.trySignUp = function ($event) {
                    if (!$scope.isSignUpFormFullyValid()) {
                        return;
                    }

                    $event.preventDefault();

                    $scope.action();
                };

                getSignUpForm().form(angular.extend({}, FormValidation.defaultSetting, {
                    on: 'blur',
                    inline: true
                }));

                $scope.internalCtrl = $scope.control || {};

                $scope.internalCtrl.handleFormError = function (reason) {
                    FormValidation.handleFormError(getSignUpForm(), reason);
                };

                $scope.internalCtrl.getFormData = function () {
                    return $scope.signUpData;
                };
            }
        };
    };

    exports.registerForm.$inject = ['FormValidation', '$timeout', '$http'];
})(angular.bplus = angular.bplus || {});