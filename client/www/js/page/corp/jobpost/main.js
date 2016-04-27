angular.module('corpModule')
    .controller("jobpostCtrl", ['$scope', '$timeout', 'jobpostService', 'resourceService', function ($scope, $timeout, jobpostService, resourceService) {
        var requiredData = [
            "position",
            "jobtitle",
            "jobtype",
            "department",
            "salarytype",
            "location",
            "requirementtag",
            "description",
            "expireyear",
            "expiremonth",
            "expireday"
        ];
        var specialRequiredData = [
            "salaryfrom",
            "salaryto"
        ];
        $scope.hasError = false;
        $scope.hasSubmitted = false;
        $scope.isloading = false;
        $scope.STATUS = {
            VIEW: "view",
            POST: "post",
        };
        $scope.status = $scope.STATUS.VIEW;
        return resourceService.init().then(function () {
            $scope.postJob = function(){
                $scope.status = $scope.STATUS.POST;
            };
            //Job Post functions
            $scope.postData = {
                position: "",
                jobtitle: "",
                jobtype: "",
                department: "",
                salarytype: "",
                location: "",
                salaryfrom: "",
                salaryto: "",
                slogan: "",
                slogantag: [],
                requirementtag: [],
                description: "",
                expireyear: "",
                expiremonth: "",
                expireday: ""
            };
            $scope.tmpTags = {
                slogantag: "",
                requirementtag: ""
            };
            $scope.displayData = {
                jobtitles: resourceService.getResource(resourceService.RESOURCE_KEY.JOB),
                jobtypes: resourceService.getResource(resourceService.RESOURCE_KEY.WORKTYPE),
                salarytypes: resourceService.getResource(resourceService.RESOURCE_KEY.SALARYTYPE),
                expireyears: [],
                expiredays: [],
                expiremonths: []
            };
            var currentTime = new Date();
            for (var i = 0; i < 10; i++) {
                var year = currentTime.getFullYear() + i;
                $scope.displayData.expireyears.push({
                    id: year,
                    text: year.toString()
                });
            }

            $scope.yearChange = function () {
                var beginMonth = 0;
                $scope.displayData.expiremonths = [];
                $scope.displayData.expiredays = [];
                if ($scope.postData.expireyear === "") {
                    $scope.postData.expiremonth = "";
                    $scope.postData.expireday = "";
                    return;
                }
                if ($scope.postData.expireyear === currentTime.getFullYear().toString()) {
                    beginMonth = currentTime.getMonth();
                }
                for (var i = beginMonth; i < 12; i++) {
                    $scope.displayData.expiremonths.push({
                        id: i,
                        text: (i + 1).toString()
                    });
                }

                $scope.postData.expiremonth = "";
                $scope.postData.expireday = "";
            };
            $scope.monthChange = function () {
                var endDay = 31;
                $scope.displayData.expiredays = [];
                var date = new Date();
                $scope.postData.expireday = "";
                for (var i = 31; i > 27; i--) {
                    date.setUTCFullYear($scope.postData.expireyear, $scope.postData.expiremonth, i);
                    if (date.getUTCMonth().toString() === $scope.postData.expiremonth) {
                        endDay = i;
                        break;
                    }
                }

                for (i = 1; i <= endDay; i++) {
                    $scope.displayData.expiredays.push({
                        id: i,
                        text: i.toString()
                    });
                }
            };
            $scope.labelChange = function (labelType) {
                var value;
                var target;
                if (labelType === "slogantag") {
                    value = $scope.tmpTags.slogantag;
                    target = $scope.postData.slogantag;
                } else if (labelType === "requirementtag") {
                    value = $scope.tmpTags.requirementtag;
                    target = $scope.postData.requirementtag;
                }
                if (value.indexOf(' ') === 0 || value.indexOf('　') === 0) {
                    $scope.tmpTags[labelType] = "";
                } else if (value.indexOf(' ') > 0 || value.indexOf('　') > 0) {
                    var index = value.indexOf(' ') > 0 ? value.indexOf(' ') : value.indexOf('　');
                    value = value.substr(0, index);
                    if (target.indexOf(value) < 0) {
                        target.push(value);
                    }
                    $scope.tmpTags[labelType] = "";
                }
            };
            $scope.lableDelete = function (labelType, value) {
                var targetArray = $scope.postData[labelType];
                var index = targetArray.indexOf(value);
                if (index >= 0) {
                    targetArray.splice(index, 1);
                }
            };
            $scope.submit = function () {
                $scope.hasSubmitted = true;
                $scope.hasError = false;
                var requiredDataToHandle = requiredData;
                //Handle special requirement
                if ($scope.postData.salarytype !== "e0495498-07e5-420a-9788-603e57e602fc") {
                    var isnumber = /[^\d]+/;
                    if (isnumber.test($scope.postData.salaryfrom)) {
                        $scope.postData.salaryfrom = 0;
                    }
                    if (isnumber.test($scope.postData.salaryto)) {
                        $scope.postData.salaryto = 0;
                    }
                    requiredDataToHandle = requiredData.concat(specialRequiredData);
                }
                //Handle requirement
                for (var i = 0; i < requiredDataToHandle.length; i++) {
                    var value = $scope.postData[requiredDataToHandle[i]];
                    if (!value && value !== 0) {
                        $scope.hasError = true;
                        break;
                    } else if ($.isArray(value) && value.length === 0) {
                        $scope.hasError = true;
                        break;
                    }
                }
                if (!$scope.hasError) {
                    $(".postconfirm").modal("show");
                    return;
                }
            };
            $scope.cancel = function(){
                $scope.status = $scope.STATUS.VIEW;
            };
            $timeout(function () {
                $(".postsuccess").modal({
                    closable: false,
                    onApprove: function () {
                        window.location.reload();
                    }
                });
                $(".postfailure").modal({
                    closable: false
                });
                $(".postconfirm").modal({
                    allowMultiple: false,
                    closable: false,
                    onApprove: function () {
                        var param = {
                            position: $scope.postData.position,
                            title: resourceService.getResource(resourceService.RESOURCE_KEY.JOB, $scope.postData.jobtitle),
                            title_id: $scope.postData.jobtitle,
                            job_type_text: resourceService.getResource(resourceService.RESOURCE_KEY.WORKTYPE, $scope.postData.jobtype),
                            job_type_id: $scope.postData.jobtype,
                            department: $scope.postData.department,
                            location: $scope.postData.location,
                            requirement_tags: $scope.postData.requirementtag,
                            description: $scope.postData.description,
                            expire_at: new Date($scope.postData.expireyear, $scope.postData.expiremonth, $scope.postData.expireday),
                            salary_type_id: $scope.postData.salarytype,
                            salary_type_text: resourceService.getResource(resourceService.RESOURCE_KEY.SALARYTYPE, $scope.postData.salarytype),
                            annual_salary_from: parseInt($scope.postData.salaryfrom),
                            annual_salary_to: parseInt($scope.postData.salaryto),
                            slogan: $scope.postData.slogan,
                            slogan_tags: $scope.postData.slogantag
                        };

                        return jobpostService.postJob(param).then(function () {
                            $(".postsuccess").modal("show");
                        }, function () {
                            $(".postfailure").modal("show");
                        });
                    }
                });
            });
        });
    }]);
