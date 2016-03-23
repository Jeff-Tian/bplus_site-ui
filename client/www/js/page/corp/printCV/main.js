angular.module('corpModule')
.controller("printcvCtrl", ['$scope', '$timeout', 'cvService', function($scope, $timeout, cvService) {
    $scope.resumeDetail = {};
    $scope.isLoading = true;
    var value = {
        memberID: '',
        jobID: '',
    };
    var param = {
        candidate_id: value.memberID,
        job_id: value.jobID
    };
    cvService.getResume(param).then(function(detail){
        
    });
}]);
