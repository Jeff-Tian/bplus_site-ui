define([
  "angular",
  "text!./tag.html"
], function(angular, template) {
  var filterTags = function(dataArray) {
    var targetArrary = [];
    var tmpObject = {};
    var targetValue = "";
    dataArray.forEach(function(value){
      if (!tmpObject.hasOwnProperty(value)) {
        targetArrary.push(value);
        tmpObject[value] = true;
      }
    });
    targetValue = targetArrary.join(" ");
    return targetValue;
  }
  
  var BplusTag = function() {
  };
  BplusTag.prototype.constructor = BplusTag;
  BplusTag.prototype.start = function(agModel) {
    agModel.
    directive("bplustag", function() {
      return {
        restrict: 'E',
        template: template,
        scope: {
          config: "=",
          value: "="
        },
        controller: function($scope) {
          var tmpDataArray = [];
          $scope.displayData = {
            candidates: ["1", "2"],
            tags: ""
          };
          $scope.inputChange = function() {
            tmpDataArray = $scope.displayData.tags.split(" ");
            $scope.value = filterTags(tmpDataArray);
          };
          $scope.candidateClick = function(value) {
            if (tmpDataArray.indexOf(value) === -1) {
              tmpDataArray.push(value);
              $scope.displayData.tags = tmpDataArray.join(" ");
              $scope.value = filterTags(tmpDataArray);
            }
          };
          $scope.displayData.tags = $scope.value;
          tmpDataArray = $scope.displayData.tags.split(" ");
          //TODO
          //Save tag
          //filter user's input and delete duplicated element
        }
      }
    })
  }
  return BplusTag;
});