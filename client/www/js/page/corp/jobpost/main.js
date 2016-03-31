angular.module('corpModule')
.controller("jobpostCtrl", ['$scope', '$timeout', 'jobpostService', function($scope, $timeout, jobpostService) {
    var toValidate = ["title", "title_id", "job_type_text", "job_type_id", "department", "location", "requirement_tags", "description",
        "expire_at", "salary_type_id", "salary_type_text"];

    var requiredData = [
      "jobtitle",
      "jobtype",
      "department",
      "salarytype",
      "location",
      "requirementtag",
      "description"
    ];
    var specialRequiredData = [
        "salaryfrom",
        "salaryto"
    ];
    $scope.hasError = false;
    $scope.hasSubmitted = false;
    return jobpostService.init().then(function(){
        $scope.postData = {
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
            description: ""
        };
        $scope.tmpTags = {
            slogantag: "",
            requirementtag: "",
        };
        $scope.displayData = {
            jobtitles: jobpostService.getResource(jobpostService.RESOURCE_KEY.job),
            jobtypes: jobpostService.getResource(jobpostService.RESOURCE_KEY.worktype),
            salarytypes: jobpostService.getResource(jobpostService.RESOURCE_KEY.salarytype),
        };
        $scope.labelChange = function(labelType){
            var key = "";
            var target;
            if (labelType === "slogantag") {
                value = $scope.tmpTags.slogantag;
                target = $scope.postData.slogantag;
            } else if (labelType === "requirementtag") {
                value = $scope.tmpTags.requirementtag;
                target = $scope.postData.requirementtag;
            }
            if (value.indexOf(' ')===0 || value.indexOf('　')===0) {
                $scope.tmpTags[labelType] = "";
            } else if (value.indexOf(' ')>0 || value.indexOf('　')>0) {
                var index = value.indexOf(' ')>0 ? value.indexOf(' ') : value.indexOf('　');
                value = value.substr(0, index);
                if (target.indexOf(value) < 0) {
                    target.push(value);
                }
                $scope.tmpTags[labelType] = "";
            }
        };
        $scope.lableDelete = function(labelType, value){
            // var targetArray = $scope.postData[labelType];
            // var index = 
            // if (indexOf())
        };
        $scope.submit = function(){
            $scope.hasSubmitted = true;
            $scope.hasError = false;
            var requiredDataToHandle = requiredData;
            //Handle special requirement
            if ($scope.postData.salarytype !== "e0495498-07e5-420a-9788-603e57e602fc") {
                var isnumber = /[^\d]+/;
                debugger;
                if (isnumber.test($scope.postData.salaryfrom)) {
                    $scope.postData.salaryfrom = "";
                }
                if (isnumber.test($scope.postData.salaryto)) {
                    $scope.postData.salaryto = "";
                }
                requiredDataToHandle = requiredData.concat(specialRequiredData);
            }
            //Handle requirement
            for (var i = 0; i < requiredDataToHandle.length; i++) {
                if (!$scope.postData[requiredDataToHandle[i]]) {
                    $scope.hasError = true;
                    break;
                }
            };
            if (!$scope.hasError) {

                //todo
                var param = {
                    title: "销售",
                    title_id: "77cf9e6f-d38b-4e12-a46a-3b0a45c6b018",
                    job_type_text: "全职",
                    job_type_id: "71bb0925-cbc6-4aa1-93dd-0906b1a19a5d",
                    department: "aaa",
                    location: "bbb",
                    requirement_tags: "hello world",
                    description: "ccc",
                    expire_at: new Date(),
                    salary_type_id: "e0495498-07e5-420a-9788-603e57e602fc",
                    salary_type_text: "面议",
                    annual_salary_from: 0,
                    annual_salary_to: 1,
                    slogan: "",
                    slogan_tag: ""
                }
                ////////////
                return jobpostService.postJob(param);
            }
            debugger;
        };
    });
}]);
