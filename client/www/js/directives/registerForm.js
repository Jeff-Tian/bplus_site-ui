(function (exports) {
    exports.registerForm = function (FormValidation, $timeout, $http) {
        return {
            templateUrl: '../../view-partial/register-form.html',
            scope: {
                action: '='
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

                function pollUpdateButtonText() {
                    refreshButtonText();

                    if (countDown > 0) {
                        $timeout(function () {
                            countDown--;
                            pollUpdateButtonText();
                        }, 1000);
                    } else {
                        countDown = countDownInterval;
                        initButtonText();
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
                    function handleError(reason) {
                        if (reason === null) {
                            getSignUpForm().addClass('error').form('add errors', ['未得到服务器响应']);
                        } else {
                            getSignUpForm().addClass('error').form('add errors', [reason]);
                        }
                    }

                    partiallyValidateSignUpForm();

                    if ($scope.isSignUpFormPartiallyValid()) {
                        $http.post('/service-proxy/sms/send', $scope.signUpData)
                            .success(function (res) {
                                if (res.isSuccess) {
                                    pollUpdateButtonText();
                                    $scope.sendCodeButtonClicked = true;
                                } else {
                                    handleError(res.message);
                                }
                            }).error(handleError);
                    }
                };

                $scope.trySignUp = function () {
                    if (!$scope.isSignUpFormFullyValid()) {
                        return;
                    }

                    $scope.action();
                };

                getSignUpForm().form(angular.extend({}, FormValidation.defaultSetting, {
                    on: 'blur',
                    inline: true
                }));
            }
        };
    };

    exports.registerForm.$inject = ['FormValidation', '$timeout', '$http'];
})(angular.bplus = angular.bplus || {});