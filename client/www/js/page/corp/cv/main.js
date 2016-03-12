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
            $scope.isLoading = false;
            deferred.resolve();

        return deferred.promise;
    };
    // Dependancy:
    $scope.displayData = {
        NUMBER_PER_PAGE: 10,
        currentPage: 1,
        data: [],
        rawData: [],
        totalPages: 10,
        getData: getData,
        deleteData: function(){
            console.log("delete");
        },
        sortData: function(){
            console.log("sort");
        }
    };
    $scope.listData = {

    };
    //tmpdata
    for(var i = 0; i < 100; i++) {
        $scope.displayData.rawData.push({
            text: "hello" + i,
            matchLevel: "a",
            flag: "recommendation",
            issueDate: "2016-2-27"
        });
    }
    //end
    $scope.option = {
        type: "",
        win: false,
        match: false
    };

    $scope.STATIC_PARAM = STATIC_PARAM;
    $scope.currentTab = STATIC_PARAM.DELIVERED;
    $scope.tabmemuClick = function(target){
        if ($scope.currentTab !== target) {
            $scope.currentTab = target;
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
