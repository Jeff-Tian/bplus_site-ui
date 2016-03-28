angular.module('corpModule')
.controller("cvCtrl", ['$scope', '$timeout', 'cvService', function($scope, $timeout, cvService) {
    var STATIC_PARAM = {
        DELIVERED: 'delivered',
        INTERESTED : 'interested',
        DELETED : 'deleted'
    };
    var FIRST_PAGE = 1;
    var getData = function(currentPage, defautlSort){
        $scope.isSortDesc = defautlSort ? true : false;
        $scope.isLoading = true;
        //Get data according $scope.displayData.currentTab;
        switch($scope.displayData.currentTab) {
            case STATIC_PARAM.DELIVERED:
                $scope.displayData.hasCheckbox = true;
                break;
            case STATIC_PARAM.INTERESTED:
            case STATIC_PARAM.DELETED:
                $scope.displayData.hasCheckbox = false;
                break;
        }
        var param = {
            jobTitle: $scope.option.type,
            champion: $scope.option.win,
            highMatch: $scope.option.match,
            sortDirection: $scope.isSortDesc ? 'desc' : 'asc'
        };
        return cvService.getCV($scope.displayData.currentTab, param).then(function(ret){
            $scope.displayData.allChecked = false;
            $scope.displayData.rawData = [];
            $scope.displayData.data = [];
            $scope.displayData.currentPage = ret.currentPage;
            $scope.displayData.totalPages = ret.total;
            for(var i = 0; i < ret.total; i++) {
                if (i === (ret.currentPage - 1) * $scope.displayData.NUMBER_PER_PAGE + i) {
                    var rawData = ret.applies[i];
                    $scope.displayData.rawData.push({
                        matchLevel: cvService.levelMapping(rawData.job_match),
                        position: rawData.job_title,
                        headshot: rawData.member.avatar,
                        flag: "",
                        issueDate: rawData.apply_date.split("T")[0],
                        gender: rawData.member.gender,
                        name: rawData.member.real_name,
                        eduData: cvService.produceDataString(rawData.education.start_date, rawData.education.end_date),
                        school: rawData.education.university,
                        major: rawData.education.major,
                        qulification: cvService.getQulificationsByID(rawData.education.qualifications_id),
                        hasChecked: false,
                        jobID: rawData.job_id,
                        memberID: rawData.member_id
                    });
                } else {
                    $scope.displayData.rawData.push({});
                }
            }
            $scope.isLoading = false;
        });
    };
    // Dependancy:
    $scope.displayData = {
        NUMBER_PER_PAGE: 10,
        currentPage: 1,
        data: [],
        rawData: [],
        totalPages: 10,
        currentTab: STATIC_PARAM.DELIVERED,
        getData: function(targetPage) {
            var me = this;
            me.allChecked = false;
            return getData(targetPage);
        },
        hasCheckbox: true,
        allChecked: false,
        detailClick: function (value){
            var param = {
                candidate_id: value.memberID,
                job_id: value.jobID
            };
            $scope.isDetailLoading = true;
            cvService.getResume(param).then(function(detail){
                $scope.isDetailLoading = false;
                $scope.resumeParam = param;
                $scope.resumeDetail = detail;
                $timeout(function(){
                    $(".corp-cv-modal.ui.modal").modal("show");
                });
            });
        },
        deleteData: function() {
            var me = this;
            var cvArray = me.data.filter(function(value){
                return value.hasChecked;
            }).map(function(value){
                return {
                    member_id: value.memberID,
                    job_id: value.jobID
                };
            });
            if (cvArray.length > 0){
                cvService.dropCV(cvArray).then(function(){
                    getData(FIRST_PAGE);
                });
            }
        },
        sortData: function(){
            var me = this;
            $scope.isSortDesc = !$scope.isSortDesc;
            getData(FIRST_PAGE);
        },
        allCheck: function(){
            var me = this;
            me.data.forEach(function(value){
                value.hasChecked = me.allChecked;
            });
        }
    };
    $scope.option = {
        type: "",
        win: false,
        match: false
    };
    $scope.publishJobs = []; 
    $scope.$watch("option.type", function(newValue, oldValue, scope){
        if (oldValue !== newValue) {
            $scope.option.type = newValue;
            getData(FIRST_PAGE);
        }
    });
    $scope.isSortDesc = true;
    $scope.isDetailLoading = true;

    $scope.resumeDetail = {};
    $scope.resumeParam = {};
    $scope.STATIC_PARAM = STATIC_PARAM;
    $scope.tabmemuClick = function(target){
        if ($scope.displayData.currentTab !== target) {
            $scope.displayData.currentTab = target;
            $scope.option.type = "";
            $(".corp-cv .ui.checkbox").checkbox("set unchecked");
            getData(FIRST_PAGE, true);
        }
    };
    var handleCV = function(type) {
        var action;
        switch (type) {
            case "pay":
                action = cvService.unlockCV;
                break;
            case "restore":
                action = cvService.restoreCV;
                break;
            case "drop":
                action = cvService.dropCV;
                break;
        }
        var param = {
            member_id: $scope.resumeParam.candidate_id,
            job_id: $scope.resumeParam.job_id
        };
        action(param).then(function(){
            return getData(FIRST_PAGE, true);
        }).then(function(){
            return cvService.getResume($scope.resumeParam)
        }).then(function(detail){
            $scope.resumeDetail = detail;
        });
    };
    $scope.payCV = function() {
        handleCV("pay");
    };
    $scope.printCV = function() {
        var targetURL = "\printcv#cid=" + $scope.resumeParam.candidate_id + ";jid=" + $scope.resumeParam.job_id;
        window.open(targetURL); 
    };
    $scope.dropCV = function(){
        handleCV("drop");
    };
    $scope.restoreCV = function(){
        handleCV("restore");
    };
    $scope.isLoading = true;
    cvService.init().then(function(){
        return cvService.getPublishedJobs();
    }).then(function(publishJobs){
        $scope.publishJobs = publishJobs;
        return getData(FIRST_PAGE, true);
    }).then(function(){
        $timeout(function(){
            $(".corp-cv .ui.checkbox.option-win").checkbox({
                onChecked: function() {
                    $scope.option.win = true;
                    getData(FIRST_PAGE, true);
                },
                onUnchecked: function() {
                    $scope.option.win = false;
                    getData(FIRST_PAGE, true);
                }
            });
            $(".corp-cv .ui.checkbox.option-match").checkbox({
                onChecked: function() {
                    $scope.option.match = true;
                    getData(FIRST_PAGE, true);
                },
                onUnchecked: function() {
                    $scope.option.match = false;
                    getData(FIRST_PAGE, true);
                }
            });
            $(".corp-cv .menu .item").tab();
            $(".corp-cv-modal.ui.modal").modal({
                closable: false
            });
        });
    });
}]);
