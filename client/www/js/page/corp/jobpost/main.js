angular.module('corpModule')
.controller("jobpostCtrl", ['$scope', '$timeout', 'jobpostService', function($scope, $timeout, jobpostService) {
    $timeout(function(){
        $('.corp-jobpost-form').form({
            fields: {
              name: {
                identifier: 'name',
                rules: [
                  {
                    type: 'empty',
                    prompt: ''
                  }
                ]
              },
            }
        });
    });
}]);
