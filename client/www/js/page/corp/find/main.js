angular.module('corpModule')
.controller("findCtrl", ['$scope', '$timeout', 'findService', 'resourceService','$q', function($scope, $timeout, findService, resourceService, $q) {

    var STATIC_PARAM = {
        SMART: "smart",
        WINNER: "winner",
        RIGHT: "right",
        LEFT: "left"
    };
    var ITEM_PER_PAGE = 3;
    var PAGE_LIMIT = 3;
    var _data;
    var _isVIP;
    var getData = function(){
        $scope.isloading = true;
        var dataFunction;
        var param = {
            job_title: $scope.searchOption.position
        };
        switch($scope.currentTab) {
            case STATIC_PARAM.SMART:
                dataFunction = findService.getSmart(param);
                break;
            case STATIC_PARAM.WINNER:
                dataFunction = findService.getWinner(param);
                break;
        }
        return dataFunction.then(function(ret){
            $scope.isloading = false;
            _data = ret.list;
            var totalPage = Math.floor(_data.length / ITEM_PER_PAGE);
            $scope.page = 1;
            $scope.maxPage = totalPage > PAGE_LIMIT ? PAGE_LIMIT : totalPage;
            $scope.displayData = fulfillData(_data.slice(0, 3));
            return ret;
        });
    };
    var checkVIP = function(){
        if (!_isVIP) {
            $(".corp-cvdetailerror-vip").modal("show");
        }
        return _isVIP;
    };
    var handleCV = function(type) {
        var action;
        var param = {
            candidate_id: $scope.resumeParam.candidate_id,
            job_id: $scope.resumeParam.job_id
        };
        var endingflow = function(){
            return $q.when();
        };
        switch (type) {
            case "mark":
                action = findService.markCV;
                break;
            case "pay":
                action = findService.unlockCV;
                endingflow = function(){
                    var deferred = $q.defer();
                    $scope.successConfirm = function(){
                        $(".corp-cvdetailsuccess").modal("hide");
                        deferred.resolve();
                    };
                    findService.getCoupon().then(function(amount){
                        $scope.couponLeft = amount;
                        $(".corp-cvdetailsuccess").modal("show");
                    });
                    return deferred.promise;
                };
                break;
        }
        action(param).then(function(){
            $scope.isDetailLoading = true;
            return $q.all([
                findService.getResume($scope.resumeParam),
                findService.getJobStatus($scope.resumeParam)
            ]);
        }).then(function(ret){
            $scope.isDetailLoading = false;
            $scope.resumeDetail = ret[0];
            $scope.resumeStatus = ret[1];
        }).then(function(ret){
            return endingflow();
        }).catch(function(error){
            if (error !== "cancel"){
                $scope.errorInfo = error;
                $(".corp-cvdetailerror").modal("show");
            }
        });
    };
    $scope.isloading = true;
    $scope.STATIC_PARAM = STATIC_PARAM;
    $scope.displayData = [];
    $scope.resumeDetail = {};
    $scope.resumeStatus = "";
    $scope.resumeParam = {};
    $scope.positions = "";
    $scope.currentTab = STATIC_PARAM.SMART;
    $scope.page = 1;
    $scope.maxPage;
    $scope.searchOption = {
        position: ''
    };
    $scope.$watch("searchOption.position", function(newValue, oldValue){
        if (oldValue !== newValue){
            getData();
        }
    });
    $scope.cvClick = function(value){
        console.log(value);
        var param = {
            candidate_id: value.member_id,
            job_id: value.job_id
        };
        $scope.isDetailLoading = true;
        var promiseArray = [
            findService.getResume(param),
            findService.getJobStatus(param)
        ];
        $q.all(promiseArray).then(function(ret){
            var detail = ret[0];
            var status = ret[1] || "";
            $scope.isDetailLoading = false;
            $scope.resumeParam = param;
            $scope.resumeDetail = detail;
            $scope.resumeStatus = status || "";
            $timeout(function(){
                $(".corp-cv-modal.ui.modal.cv-detail").modal("show");
            });
        });
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
    $scope.tabmemuClick = function(targetItem){
        if ($scope.currentTab !== targetItem){
            $scope.currentTab = targetItem;
            $(".menu .item").removeClass("active");
            $(".menu .item[data-tab='" + targetItem + "']").addClass("active");
            $scope.searchOption.position = "";
            getData();
        }
    };
    $scope.levelMapping = function (value) {
        var ret = 0;
        if (value < 20) {
            ret = 'e';
        } else if (value < 40) {
            ret = 'd';
        } else if (value < 60) {
            ret = 'c';
        } else if (value < 80) {
            ret = 'b';
        } else {
            ret = 'a';
        }
        return ret;
    };
    $scope.onPageClick = function(pageNumber){
        if (pageNumber === 1 || checkVIP()) {
            var startNumber = (pageNumber - 1) * ITEM_PER_PAGE;
            $scope.displayData = fulfillData(_data.slice(startNumber, startNumber+ITEM_PER_PAGE));
            $scope.page = pageNumber;
        }
    };
    $scope.arrowClick = function(direction){
        switch(direction) {
            case STATIC_PARAM.RIGHT:
                if (checkVIP() && $scope.page < $scope.maxPage) {
                    $scope.onPageClick(++$scope.page);
                }
                break;
            case STATIC_PARAM.LEFT:
                if ($scope.page > 1) {
                    $scope.onPageClick(--$scope.page);
                }
                break;
        }
    };
    $scope.errorConfirm = function(){
        $(".corp-cvdetailerror").modal("hide");
    };
    var fulfillData = function(dataInput) {
        for (var i = dataInput.length; i < 3; i++) {
            dataInput.push({
                hide:true
            });
        }
        return dataInput;
    };
    resourceService.init().then(function(){
        return findService.checkVIP();
    }).then(function(isVIP){
        _isVIP = isVIP;
        var initPromise = [
            getData(),
            resourceService.getResource(resourceService.RESOURCE_KEY.JOB)
        ];
        return $q.all(initPromise);
    }).then(function(data){
        var jobpositions = data[1];
        $scope.positions = jobpositions;
        $timeout(function(){
            $(".corp-cv-modal.ui.modal").modal({
                allowMultiple: true,
                closable: false
            });
        });
    });
}]);
