angular.module('corpModule')
.controller("findCtrl", ['$scope', '$timeout', 'findService', '$q', function($scope, $timeout, findService, $q) {
    console.log("hello world");
    var STATIC_PARAM = {
        SMART: "smart",
        WINNER: "winner"
    };
    $scope.isloading = true;
    $scope.STATIC_PARAM = STATIC_PARAM;
    $scope.displayData = ["1", "2", "3"];
    $scope.cvClick = function(target){
        console.log(target);
        $(".corp-cv-modal.ui.modal").modal("show");
    };
    $scope.tabmemuClick = function(targetItem){
        $(".menu .item").removeClass("active");
        $(".menu .item[data-tab='" + targetItem + "']").addClass("active");
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
    $scope.arrowClick = function(direction){
        console.log(direction);
    };
    // var initPromise = [
    //     findService.getSmart(),
    //     findService.getWinner()
    // ];
    var fulfillData = function(dataInput) {
        for (var i = dataInput.length; i < 3; i++) {
            dataInput.push({
                hide:true
            });
        }
        return dataInput;
    };
    findService.getSmart().then(function(data){
data.list.pop();
        $scope.displayData = fulfillData(data.list);
        $timeout(function(){
            $scope.isloading = false;
            $(".corp-cv-modal.ui.modal").modal({
                closable: false
            });
        });
    });
}]);
