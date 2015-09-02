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
    .factory('FormValidation', function () {
        var res = {
            validChineseMobileNumberPattern: '^(?:(0?86)|[\\(（](0?86)[\\)）])?-?(13\\d|15\\d|14[57]|17\\d|18\\d)(\\d{8})$'
        };

        res.defaultSetting = {
            fields: {
                mobile: {
                    identifier: 'mobile',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入手机号码'
                    }, {
                        type: 'regExp[' + res.validChineseMobileNumberPattern + ']',
                        prompt: '请输入有效的手机号码'
                    }]
                },

                password: {
                    identifier: 'password',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入密码'
                    }]
                },

                email: {
                    identifier: 'email',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入邮箱地址'
                    }, {
                        type: 'email',
                        prompt: '请输入有效的邮箱地址'
                    }]
                },

                captcha: {
                    identifier: 'captcha',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入验证码'
                    }]
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
        };

        return res;
    })
    .controller('AppCtrl', ['$scope', 'FormValidation', function ($scope, FormValidation) {
        var $form = $('.ui.form');

        $form.form(FormValidation.defaultSetting);
    }])
    .controller('SignUpCtrl', ['$scope', function ($scope) {
        $scope.signUp = function () {
            window.location.href = 'personal-history';
        };
    }])
    .controller('BindMobileCtrl', ['$scope', function ($scope) {
        $scope.bindMobile = function () {

        };
    }])
    .controller('LoginCtrl', ['$scope', function ($scope) {
        $scope.loginData = {
            mobile: '',
            password: '',
            rememberMe: false
        };

        var $loginForm = $('.ui.form.login');

        $scope.isLoginFormValid = function () {
            if ($scope.loginForm.$pristine) {
                return false;
            }

            return $loginForm.form('is valid');
        };

        $scope.tryLogin = function () {
            if (!$scope.isLoginFormValid()) {
                return;
            }

            //alert('submitted');
        };
    }])
    .controller('ResetPasswordCtrl', ['$scope', '$element', function ($scope, $element) {
        $scope.resetPassword = function () {
            $('.reset.shape').shape('flip over');
        };

        $('.reset.shape').shape();
        var $form = $($element);
        $form.form({
            on: 'blur',
            inline: true,
            fields: {
                email: {
                    identifier: 'email',
                    rules: [{
                        type: 'empty',
                        prompt: '请填写邮箱地址'
                    }, {
                        type: 'email',
                        prompt: '请填写有效的邮箱地址'
                    }]
                },
                captcha: {
                    identifier: 'captcha',
                    rules: [{
                        type: 'empty',
                        prompt: '请填写验证码'
                    }]
                }
            }
        });
    }])
    .controller('ResetPasswordByEmailCtrl', ['$scope', function ($scope) {
        var $shape = $('.shape.reset-by-email');
        //$shape.shape();

        $scope.emailSent = false;
        var $form = $('.ui.form.reset-by-email');
        $scope.isResetPasswordFormValid = function () {
            if ($scope.resetPasswordForm.$pristine) {
                return false;
            }

            return $form.form('is valid');
        };

        $scope.tryResetPassword = function ($event) {
            if (!$scope.isResetPasswordFormValid()) {
                return;
            }

            //$shape.shape('flip right');
            $scope.emailSent = true;

            $event.preventDefault();
        };
    }])
    .controller('SetPasswordCtrl', ['$scope', function ($scope) {
        var $form = $('.ui.form.set-password');
        $scope.isSetPasswordFormValid = function () {
            if ($scope.setPasswordForm.$pristine) {
                return false;
            }

            return $form.form('is valid');
        };

        $scope.setData = {
            password: ''
        };

        $scope.trySetPassword = function () {
            if (!$scope.isSetPasswordFormValid()) {
                return;
            }

            //alert('set');
        };
    }])
    .controller('PersonalHistoryCtrl', ['$scope', 'FormValidation', function ($scope, FormValidation) {
        $('.ui.dropdown').not('.defer')
            .dropdown({})
        ;

        $('.ui.checkbox')
            .checkbox()
        ;

        var $shape = $('.ui.shape.personal-history');
        $shape.shape();
        $scope.tryNextStep = function () {
            if (!$form1.form('is valid')) {
                return;
            }

            $shape.shape('flip over');
        };

        $scope.gotoNextStep = function () {
            $form1.form('clear');
            $shape.shape('flip over');
        };

        $scope.prevStep = function () {
            $shape.shape('flip back');
        };

        $scope.gotoComplete = function () {
            //alert('submitted');
        };

        $scope.trySubmit = function () {
            if (!$form2.form('is valid')) {
                return;
            }

            //alert('submitted');
        };

        $scope.birthYearList = (function () {
            var res = [];
            var thisYear = new Date().getFullYear();
            for (var i = 1980; i < thisYear - 15; i++) {
                res.push(i);
            }

            return res;
        })();

        $scope.getBirthDayList = function () {
            var year = $scope.personalInfo.yearOfBirth;
            var month = $scope.personalInfo.monthOfBirth;

            if (!year || !month) {
                return [];
            }

            var date = new Date(year, month - 1, 1);
            var days = [];

            while (date.getMonth() === month - 1) {
                days.push(date.getDate());
                date.setDate(date.getDate() + 1);
            }

            return days;
        };

        $scope.startYearList = (function () {
            var res = [];
            var thisYear = new Date().getFullYear();
            for (var i = thisYear - 10; i <= thisYear; i++) {
                res.push(i);
            }

            return res;
        })();
        $scope.endYearList = (function () {
            var y = $scope.startYearList[$scope.startYearList.length - 1];
            var res = [].concat($scope.startYearList);

            for (var i = 0; i < 8; i++) {
                res.push(y + i + 1);
            }

            return res;
        })();
        $scope.monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        var $form1 = $('.ui.form.personal-history.step-1');
        var $form2 = $('.ui.form.personal-history.step-2');

        $form1.form(angular.extend({}, FormValidation.defaultSetting, {
            fields: {
                realName: {
                    identifier: 'realName',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入真实姓名'
                    }]
                },
                gender: {
                    identifier: 'gender',
                    rules: [{
                        type: 'empty',
                        prompt: '请选择性别'
                    }]
                },
                yearOfBirth: {
                    identifier: 'yearOfBirth',
                    rules: [{
                        type: 'empty',
                        prompt: '请选择出生年份'
                    }]
                },
                monthOfBirth: {
                    identifier: 'monthOfBirth',
                    rules: [{
                        type: 'empty',
                        prompt: '请选择出生月份'
                    }]
                },
                dayOfBirth: {
                    identifier: 'dayOfBirth',
                    rules: [{
                        type: 'empty',
                        prompt: '请选择出生日期'
                    }]
                },
                currentLocation: {
                    identifier: 'currentLocation',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入当前所在地'
                    }]
                }
            }
        }));

        $form2.form(angular.extend({}, FormValidation.defaultSetting, {
            fields: {
                schoolName: {
                    identifier: 'schoolName',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入学校名称'
                    }]
                },

                schoolMajor: {
                    identifier: 'schoolMajor',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入所学专业'
                    }]
                },

                schoolEducationBackground: {
                    identifier: 'schoolEducationBackground',
                    rules: [{
                        type: 'empty',
                        prompt: '请选择学历'
                    }]
                },

                schoolStartYear: {
                    identifier: 'schoolStartYear',
                    rules: [{
                        type: 'empty',
                        prompt: '请选择求学开始年份'
                    }]
                },

                schoolStartMonth: {
                    identifier: 'schoolStartMonth',
                    rules: [{
                        type: 'empty',
                        prompt: '请选择求学开始月份'
                    }]
                },

                schoolEndYear: {
                    identifier: 'schoolEndYear',
                    rules: [{
                        type: 'empty',
                        prompt: '请选择毕业年份'
                    }]
                },

                schoolEndMonth: {
                    identifier: 'schoolEndMonth',
                    rules: [{
                        type: 'empty',
                        prompt: '请选择毕业月份'
                    }]
                }
            }
        }));

        $scope.schoolInfo = {
            name: '',
            major: '',
            educationBackground: '',
            startYear: '',
            startMonth: '',
            endYear: '',
            endMonth: ''
        };

        $scope.personalInfo = {
            realName: '',
            gender: '',
            yearOfBirth: '',
            monthOfBirth: '',
            dayOfBirth: '',
            setPrivacy: true,
            currentLocation: ''
        };
    }])
    .directive('dropdown', ['$timeout', function ($timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    $(element).parent().dropdown();
                });
            }
        };
    }])
    .directive('registerForm', ['FormValidation', '$timeout', function (FormValidation, $timeout) {
        return {
            templateUrl: '../../../view-partial/register-form.html',
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
                        templates: templates,
                        on: 'blur',
                        inline: true
                    });

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
                        pollUpdateButtonText();
                    }

                    $scope.sendCodeButtonClicked = true;
                };

                $scope.trySignUp = function () {
                    if (!$scope.isSignUpFormFullyValid()) {
                        return;
                    }

                    $scope.action();
                };

                getSignUpForm().form({
                    fields: angular.extend({}, fields, {
                        verificationCode: {
                            identifier: 'verificationCode',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: '请输入手机验证码'
                                }
                            ]
                        },

                        password: {
                            identifier: 'password',
                            rules: [{
                                type: 'empty',
                                prompt: '请设置密码'
                            }]
                        }
                    }),
                    templates: templates,
                    on: 'blur',
                    inline: true
                });
            }
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

    $form.on('click', '.remove.circle.icon', function () {
        $form.removeClass('error');
    });

    $('.checkbox').checkbox();
})();