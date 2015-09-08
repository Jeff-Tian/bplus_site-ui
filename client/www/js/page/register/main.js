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
    .factory('FormValidation', angular.bplus.FormValidation)
    .controller('AppCtrl', angular.bplus.AppCtrl)
    .directive('captcha', angular.bplus.captcha || {})
    .controller('SignUpCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.registerFormCtrl = {};

        $scope.signUp = function () {
            var signUpData = $scope.registerFormCtrl.getFormData();

            $http.post('/service-proxy/member/register', signUpData)
                .success(function (res) {
                    if (res.isSuccess) {
                        $http.post('/service-proxy/logon/authentication', {
                            value: signUpData.mobile,
                            password: signUpData.password
                        })
                            .success(function (json) {
                                if (json.isSuccess) {
                                    window.location.href = 'personal-history';
                                } else {
                                    $scope.registerFormCtrl.handleFormError(json.message);
                                }
                            }).error($scope.registerFormCtrl.handleFormError);
                    } else {
                        $scope.registerFormCtrl.handleFormError(res.message);
                    }
                }).error($scope.registerFormCtrl.handleFormError);
        };
    }])
    .controller('BindMobileCtrl', ['$scope', function ($scope) {
        $scope.bindMobile = function () {

        };
    }])
    .directive('ngEnter', angular.bplus.ngEnter || {})
    .controller('LoginCtrl', ['$scope', 'FormValidation', '$http', function ($scope, FormValidation, $http) {
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

        $scope.tryLogin = function ($event) {
            $event.preventDefault();

            if (!$scope.isLoginFormValid()) {
                return;
            }

            $http.post('/service-proxy/logon/authentication', {
                value: $scope.loginData.mobile,
                password: $scope.loginData.password,
                remember: $scope.loginData.rememberMe
            }).success(function (res) {
                if (res.isSuccess) {
                    //window.location.href = '/';
                } else {
                    FormValidation.handleFormError($loginForm, res.message);
                }
            }).error(FormValidation.delegateHandleFormError($loginForm));
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
    .directive('registerForm', angular.bplus.registerForm || {})
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