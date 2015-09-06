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
        link: function(scope, element) {
          var tmpDataArray = [];
          var latestInput = "";
          scope.displayData = {
            candidates: [],
            tags: ""
          };
          scope.inputChange = function() {
            tmpDataArray = scope.displayData.tags.split(" ");
            var lastValue = tmpDataArray[tmpDataArray.length - 1];
            if (lastValue !== latestInput) {
              latestInput = lastValue;
              //TODO
              //Search something
            }
            scope.value.tags = filterTags(tmpDataArray);
          };
          scope.candidateClick = function(value) {
            if (tmpDataArray.indexOf(value) === -1) {
              tmpDataArray.push(value);
              scope.displayData.tags = tmpDataArray.join(" ");
              scope.value.tags = filterTags(tmpDataArray);
            }
          };
          scope.displayData.tags = scope.value.tags;
          tmpDataArray = scope.displayData.tags.split(" ");
        }
      }
    })
  }
  return BplusTag;
});