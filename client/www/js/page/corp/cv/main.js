angular.module('corpModule')
.controller("cvCtrl", ['$scope', '$q', '$timeout', function($scope, $q, $timeout) {
    var STATIC_PARAM = {
        DELIVERED: 'delivered',
        INTERESTED : 'interested',
        DELETED : 'deleted'
    };
    var FIRST_PAGE = 1;
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
        setTimeout(function(){
            $scope.displayData.allChecked = false;
            $scope.displayData.rawData = [];
            $scope.displayData.currentPage = currentPage;
            //tmpdata
            for(var i = 0; i < 100; i++) {
                $scope.displayData.rawData.push({
                    text: "hello" + i,
                    matchLevel: "a",
                    position: "销售实习生",
                    headshot: "http://img.hcdlearning.com/FiVn2EYU-IWcmQad3lMWyM04jgoZ-minor",
                    flag: "recommendation",
                    issueDate: "2016-2-27",
                    gender: "female",
                    name: "许小婕",
                    hasChecked: false
                });
            }
            $scope.isLoading = false;
            //end
            deferred.resolve();
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
            console.log("sort");
            var me = this;
            getData(FIRST_PAGE);
        },
        allCheck: function(){
            var me = this;
            me.data.forEach(function(value){
                value.hasChecked = me.allChecked;
            });
        }
    };
    //tmpdata
    for(var i = 0; i < 100; i++) {
        $scope.displayData.rawData.push({
            text: "hello" + i,
            matchLevel: "a",
            position: "销售实习生",
            flag: "recommendation",
            issueDate: "2016-2-27",
            hasChecked: false
        });
    }
    //end
    $scope.option = {
        type: "",
        win: false,
        match: false
    };

    $scope.STATIC_PARAM = STATIC_PARAM;
    $scope.tabmemuClick = function(target){
        if ($scope.displayData.currentTab !== target) {
            $scope.displayData.currentTab = target;
            $scope.option.type = "";
            $(".corp-cv .ui.checkbox").checkbox("set unchecked");
            getData(FIRST_PAGE);
        }
    };
    $scope.isLoading = true;
    getData(FIRST_PAGE).then(function(){
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
