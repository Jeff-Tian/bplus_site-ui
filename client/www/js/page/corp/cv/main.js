angular.module('corpModule')
.controller("cvCtrl", ['$scope', '$timeout', 'cvService', '$q', function($scope, $timeout, cvService, $q) {
    var STATIC_PARAM = {
        DELIVERED: 'delivered',
        INTERESTED: 'interested',
        DELETED: 'deleted',
        POOL: "pool"
    };
    var FIRST_PAGE = 1;
    var getData = function(currentPage, defautlSort){
        $scope.isSortDesc = defautlSort ? true : false;
        $scope.isLoading = true;
        //Get data according $scope.displayData.currentTab;
        switch($scope.displayData.currentTab) {
            case STATIC_PARAM.DELIVERED:
            case STATIC_PARAM.INTERESTED:
                $scope.displayData.hasCheckbox = true;
                break;
            case STATIC_PARAM.DELETED:
                $scope.displayData.hasCheckbox = false;
                break;
        }
        var param = {
            currentPage: currentPage,
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
                    if (!rawData.education) {
                        rawData.education = {start_date:"", end_date:""};
                    }
                    $scope.displayData.rawData.push({
                        matchLevel: cvService.levelMapping(rawData.job_match),
                        position: rawData.job_title,
                        headshot: rawData.member.avatar || "",
                        flag: "",
                        issueDate: (rawData.apply_date || rawData.action_date).split("T")[0],
                        gender: rawData.member.gender || "",
                        name: rawData.member.real_name || "",
                        eduData: cvService.produceDataString(rawData.education.start_date, rawData.education.end_date),
                        school: rawData.education.university || "",
                        major: rawData.education.major || "",
                        qulification: cvService.getQulificationsByID(rawData.education.qualifications_id),
                        hasChecked: false,
                        jobID: rawData.job_id,
                        companyID: rawData.company_id,
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
                company_id: value.companyID,
                job_id: value.jobID
            };
            $scope.isDetailLoading = true;
            $q.all([
                cvService.getResume(param),
                cvService.getJobStatus(param)
            ]).then(function(ret){
                var detail = ret[0];
                var status = ret[1] || "";
                $scope.isDetailLoading = false;
                $scope.resumeParam = param;
                $scope.resumeDetail = detail;
                $scope.resumeStatus = status || "";
                $timeout(function(){
                    $(".corp-cvdetail").modal("show");
                });
            });
        },
        deleteData: function() {
            var me = this;
            var cvArray = me.data.filter(function(value){
                return value.hasChecked;
            }).map(function(value){
                return {
                    candidate_id: value.memberID,
                    job_id: value.jobID
                };
            });
            var isApplied = $scope.displayData.currentTab === STATIC_PARAM.DELIVERED;
            if (cvArray.length > 0){
                cvService.dropCV(cvArray, isApplied).then(function(){
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
    $scope.resumeStatus = "";
    $scope.resumeParam = {};
    $scope.positionConfirmOption = "";
    $scope.STATIC_PARAM = STATIC_PARAM;
    $scope.tabmemuClick = function(target){
        if ($scope.displayData.currentTab !== target) {
            $scope.displayData.currentTab = target;
            $scope.option.type = "";
            $(".corp-cv .ui.checkbox").checkbox("set unchecked");
            getData(FIRST_PAGE, true);
        }
    };
    $scope.errorConfirm = function(){
        $(".corp-cvdetailerror").modal("hide");
    };
    var handleCV = function(type) {
        var action;
        var param = {
            candidate_id: $scope.resumeParam.candidate_id,
            job_id: $scope.resumeParam.job_id,
            company_id: $scope.resumeParam.company_id
        };
        var flow = function(){
            return $q.when();
        };
        var isApplied = $scope.resumeStatus==="";
        switch (type) {
            case "mark":
                action = cvService.markCV;
                break;
            case "pay":
                action = cvService.unlockCV;
                $scope.positionConfirmOption = "";
                flow = function(){
                    var deferred = $q.defer();
                    $scope.cancelDetailConfirm = function(){
                        $(".corp-cvdetail-positionconfirm").modal("hide");
                        deferred.reject("cancel");
                    };
                    $scope.confirmDetailConfirm = function(){
                        $(".corp-cvdetail-positionconfirm").modal("hide");
                        param.job_title_text = $scope.positionConfirmOption;
                        deferred.resolve();
                    };
                    $(".corp-cvdetail-positionconfirm").modal("show");
                    return deferred.promise;
                };
                break;
            case "restore":
                action = cvService.restoreCV;
                break;
            case "drop":
                action = cvService.dropCV;
                param = [param];
                break;
        }
        flow().then(function(){
            return action(param, isApplied);
        }).then(function(){
            return getData(FIRST_PAGE, true);
        }).then(function(){
            $scope.isDetailLoading = true;
            return $q.all([
                cvService.getResume($scope.resumeParam),
                cvService.getJobStatus($scope.resumeParam)
            ]);
        }).then(function(ret){
            $scope.isDetailLoading = false;
            $scope.resumeDetail = ret[0];
            $scope.resumeStatus = ret[1];
        }).catch(function(error){
            if (error !== "cancel"){
                $scope.errorInfo = error;
                $(".corp-cvdetailerror").modal("show");
            }
        });
    };
    $scope.editCVPosition = function(target) {
        //TODO
        $scope.positionConfirmOption = "";//target.position_title;
        $scope.cancelDetailConfirm = function(){
            $(".corp-cvdetail-positionconfirm").modal("hide");
            var param = {
                candidate_id: target.member_id,
                job_id: target.job_id,
                job_title_text: ""
            };
            return cvService.markCVPosition(param);
        };
        $scope.confirmDetailConfirm = function(){
            $(".corp-cvdetail-positionconfirm").modal("hide");
        };
        $(".corp-cvdetail-positionconfirm").modal("show");
    };
    $scope.markCV = function() {
        handleCV("mark");
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
                closable: false,
                allowMultiple: true
            });
            $(".corp-cvdetail-positionconfirm").modal({
                closable: false,
                allowMultiple: true,
            });
        });
    });
}]);
