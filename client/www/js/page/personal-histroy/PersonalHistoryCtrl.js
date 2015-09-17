(function (exports) {
    exports.PersonalHistoryCtrl = function ($scope, FormValidation, $timeout, service, $filter, msgBus, $q) {
        $('.ui.dropdown').not('.defer')
            .dropdown({})
        ;

        $('.ui.checkbox')
            .checkbox()
        ;

        var $shape = $('.ui.shape.personal-history');
        $shape.shape();

        var submitting = false;
        $scope.tryNextStep = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            if (!$form1.form('is valid')) {
                return;
            }

            if (submitting) {
                return;
            }

            submitting = true;

            $q.all([
                service
                    .post('/service-proxy/member/update-sso-profile', $scope.memberInfo)
                    .then(function (res) {
                        console.log(res);

                        $scope.fetchProfile();

                        //$shape.shape('flip over').find('.active.side').removeClass('hidden');
                    })
                    .catch(FormValidation.delegateHandleFormError($form1))
                ,

                service
                    .post('/service-proxy/member/update-profile', $scope.personalInfo)
                    .then(function (res) {
                        console.log(res);
                    })
                    .catch(FormValidation.delegateHandleFormError($form1))
            ])
                .then(function () {
                    $shape.shape('flip over').find('.active.side').removeClass('hidden');
                })
                .finally(function () {
                    submitting = false;
                })
        };

        $scope.gotoNextStep = function () {
            $form1.form('clear');
            $shape.shape('flip over').find('.active.side').removeClass('hidden');
        };

        $scope.prevStep = function () {
            $shape.shape('flip back').find('.active.side').removeClass('hidden');
        };

        $scope.gotoComplete = function () {
            window.location.href = '/';
        };

        $scope.trySubmit = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            if (!$form2.form('is valid')) {
                return;
            }

            if (submitting) {
                return;
            }

            submitting = true;

            service
                .post('/service-proxy/member/save-education', $scope.memberInfo)
                .then(function (res) {
                    console.log(res);
                    $scope.gotoComplete();
                })
                .catch(FormValidation.delegateHandleFormError($form2))
                .finally(function () {
                    submitting = false;
                })
            ;
        };

        $scope.birthYearList = (function () {
            var res = [];
            var thisYear = new Date().getFullYear();
            for (var i = 1980; i < thisYear - 15; i++) {
                res.push(i.toString());
            }

            return res;
        })();

        var prefilledDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

        $scope.getBirthDayList = function () {
            var year = $scope.personalInfo.yearOfBirth;
            var month = $scope.personalInfo.monthOfBirth;
            var days = [];

            if (!year || !month) {
                days = prefilledDays;
            } else {
                var date = new Date(year, month - 1, 1);

                while (date.getMonth() === month - 1) {
                    days.push(date.getDate());
                    date.setDate(date.getDate() + 1);
                }
            }

            if ($scope.personalInfo.dayOfBirth && days.indexOf(Number($scope.personalInfo.dayOfBirth)) < 0) {
                $scope.personalInfo.dayOfBirth = days[days.length - 1];
                $('.ui.dropdown.dayOfBirth').dropdown('set text', $scope.personalInfo.dayOfBirth);
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

        $scope.genderList = [{
            value: "M", text: $filter('translate')('Male')
        }, {
            value: "F", text: $filter('translate')('Female')
        }];

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
            yearOfBirth: '',
            monthOfBirth: '',
            dayOfBirth: '',
            setPrivacy: true,
            currentLocation: ''
        };

        msgBus.onMsg(msgBus.events.profile.loaded, $scope, function () {
            if ($scope.memberInfo.birthday) {
                var d = new Date($scope.memberInfo.birthday);

                $scope.personalInfo.yearOfBirth = d.getUTCFullYear().toString();
                $scope.personalInfo.monthOfBirth = (d.getUTCMonth() + 1).toString();
                $scope.personalInfo.dayOfBirth = d.getUTCDate().toString();
            }
        });

        $scope.$watch('personalInfo.yearOfBirth', updateMemberInfoBirthday);
        $scope.$watch('personalInfo.monthOfBirth', updateMemberInfoBirthday);
        $scope.$watch('personalInfo.dayOfBirth', updateMemberInfoBirthday);

        function updateMemberInfoBirthday() {
            var year = $scope.personalInfo.yearOfBirth;
            var month = $scope.personalInfo.monthOfBirth ? Number($scope.personalInfo.monthOfBirth) - 1 : 1;
            var day = $scope.personalInfo.dayOfBirth ? Number($scope.personalInfo.dayOfBirth) + 1 : 1;

            $scope.memberInfo.birthday = new Date(year, month, day);
        }
    };

    exports.PersonalHistoryCtrl.$inject = ['$scope', 'FormValidation', '$timeout', 'service', '$filter', 'msgBus', '$q'];
})(angular.bplus = angular.bplus || {});