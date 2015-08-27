'use strict';

// Declare app level module which depends on views, and components
angular.module('signIn', [
    'ui.router',
    'ng.utils'
])
    .config([
        '$urlRouterProvider',
        function ($urlRouterProvider) {
        }
    ])
    .run(function () {

    })
    .controller('SignUpCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.signUpData = {
            mobile: '',
            captcha: '',
            verificationCode: '',
            password: ''
        };

        var validChineseMobileNumberPattern = '^(?:(0?86)|[\\(（](0?86)[\\)）])?-?(13\\d|15\\d|14[57]|17\\d|18\\d)(\\d{8})$';

        var countDownInterval = 60;
        var countDown = countDownInterval;

        function updateButtonText(text) {
            $scope.verificationCodeButtonText = text;
        }

        function initButtonText() {
            updateButtonText('获取手机验证码');
            $scope.allowGetCode = true;
        }

        function refreshButtonText() {
            updateButtonText(countDown + ' 秒后重新获取...');
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

        var fields = {
            mobile: {
                identifier: 'mobile',
                rules: [
                    {
                        type: 'regExp[' + validChineseMobileNumberPattern + ']',
                        prompt: '请输入有效的手机号码'
                    }
                ]
            },

            captcha: {
                identifier: 'captcha',
                rules: [
                    {
                        type: 'empty',
                        prompt: '请输入验证码'
                    }
                ]
            }
        };

        var templates = {
            error: function (errors) {
                var html = '<ul class="list">';
                $.each(errors, function (index, value) {
                    html += '<li>' + value + '</li>';
                });
                html += '</ul><i class="large remove circle icon"></i>';

                return $(html);
            }
        };

        function getSignUpForm() {
            return $('form.b-sign-up');
        }

        function partiallyValidateSignUpForm() {
            var $form = getSignUpForm();

            $form.form({
                fields: fields,
                templates: templates
            });

            $form.form('validate form');

            return $form;
        }

        $scope.isSignUpFormPartiallyValid = function () {
            //return partiallyValidateSignUpForm().form('is valid');
            return $scope.signUpData.mobile && $scope.signUpData.mobile.match(new RegExp(validChineseMobileNumberPattern)) && $scope.signUpData.captcha;
        };

        $scope.isSignUpFormFullyValid = function () {
            return $scope.isSignUpFormPartiallyValid() && $scope.signUpData.verificationCode && $scope.signUpData.password;
        };

        $scope.getVerificationCode = function () {
            partiallyValidateSignUpForm();

            if ($scope.isSignUpFormPartiallyValid()) {
                pollUpdateButtonText();
            }
        };

        $scope.trySignUp = function () {
            alert('submitted');
        };
    }])
;

// TODO: integrated into JS framework
(function () {

    // TODO: initial tabs, to be integrated into JS framework
    $('.menu .item')
        .tab({
            context: '.b-signin-wide',
            history: true
        });

    var $form = $('.ui.form');

    $form
        .form({
            fields: {
                mobile: {
                    identifier: 'mobile',
                    rules: [
                        {
                            type: 'regExp[/^(?:(0?86)|[\\(（](0?86)[\\)）])?-?(13\\d|15\\d|14[57]|17\\d|18\\d)(\\d{8})$/]',
                            prompt: '请输入有效的手机号码'
                        }
                    ]
                },

                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '密码不能为空'
                        }
                    ]
                },

                captcha: {
                    identifier: 'captcha',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入验证码'
                        }
                    ]
                },

                verificationCode: {
                    identifier: 'verificationCode',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入手机验证码'
                        }
                    ]
                }
            },
            templates: {
                error: function (errors) {
                    var html = '<ul class="list">';
                    $.each(errors, function (index, value) {
                        html += '<li>' + value + '</li>';
                    });
                    html += '</ul><i class="large remove circle icon"></i>';

                    return $(html);
                }
            }
        });

    $form.on('click', '.remove.circle.icon', function () {
        $form.removeClass('error');
    });

    $('.checkbox').checkbox();
})();