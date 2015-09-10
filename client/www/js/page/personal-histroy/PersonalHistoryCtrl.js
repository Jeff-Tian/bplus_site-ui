(function (exports) {
    exports.PersonalHistoryCtrl = function ($scope, FormValidation, $timeout) {
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

            $timeout(function () {

                $shape.shape('flip over');
            });
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

        window.test = $scope;

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
    };

    exports.PersonalHistoryCtrl.$inject = ['$scope', 'FormValidation', '$timeout'];
})(angular.bplus = angular.bplus || {});