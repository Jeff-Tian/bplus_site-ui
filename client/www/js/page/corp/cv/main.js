angular.module('corpModule')
.controller("cvCtrl", ['$scope', '$q', '$timeout', 'cvService', function($scope, $q, $timeout, cvService) {
    var STATIC_PARAM = {
        DELIVERED: 'delivered',
        INTERESTED : 'interested',
        DELETED : 'deleted'
    };
    var FIRST_PAGE = 1;
    var produceDataString = function(startDate, endDate){
        var startDateString = '';
        var endDateString = '';
        function getYearAndMonth(dataString) {
            var date = new Date(dataString);
            return date.getFullYear() + '/' + (date.getMonth() + 1)
        }
        startDateString = getYearAndMonth(startDate);
        if (endDate == "") {
            endDateString = '至今';
        } else {
            endDateString = getYearAndMonth(endDate);
        }
        return startDateString + "~" + endDateString;
    }
    var getData = function(currentPage){
        var deferred = $q.defer();
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
            sortDirection: $scope.isSortDesc ? 'desc' : 'asc'
         };
        return cvService.getCV($scope.displayData.currentTab, param).then(function(ret){
            $scope.displayData.allChecked = false;
            $scope.displayData.rawData = [];
            $scope.displayData.data = [];
            $scope.displayData.currentPage = ret.currentPage;
            $scope.displayData.totalPages = ret.total;
            for(var i = 0; i < ret.total; i++) {
                var rawData = ret.applies[i];
                $scope.displayData.rawData.push({
                    matchLevel: cvService.levelMapping(rawData.job_match),
                    position: rawData.job_title,
                    headshot: rawData.member.avatar,
                    flag: "",
                    issueDate: rawData.apply_date.split("T")[0],
                    gender: "female",//todo
                    name: rawData.member.real_name,
                    eduData: produceDataString(rawData.education.start_date, rawData.education.end_date),
                    school: rawData.education.university,
                    major: rawData.education.major,
                    qulification: cvService.getQulificationsByID(rawData.education.qualifications_id),
                    hasChecked: false,
                    jobID: rawData.job_id,
                    memberID: rawData.member_id
                });
            }
            $scope.isLoading = false;
        });

        return deferred.promise;
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
        deleteData: function() {
            console.log("delete");
            getData(FIRST_PAGE);
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
    $scope.isSortDesc = true;

    $scope.STATIC_PARAM = STATIC_PARAM;
    $scope.tabmemuClick = function(target){
        if ($scope.displayData.currentTab !== target) {
            $scope.displayData.currentTab = target;
            $scope.option.type = "";
            $scope.isSortDesc = true;
            $(".corp-cv .ui.checkbox").checkbox("set unchecked");
            getData(FIRST_PAGE);
        }
    };
    $scope.isLoading = true;
    cvService.init().then(function(){
        return getData(FIRST_PAGE);
    }).then(function(){
        $timeout(function(){
            $(".corp-cv .ui.checkbox.option-win").checkbox({
                onChecked: function() {
                    $scope.option.win = true;
                },
                onUnchecked: function() {
                    $scope.option.win = false;
                }
            });
            $(".corp-cv .ui.checkbox.option-match").checkbox({
                onChecked: function() {
                    $scope.option.match = true;
                },
                onUnchecked: function() {
                    $scope.option.match = false;
                }
            });
            $(".corp-cv .menu .item").tab();
        });
    });
}]);
