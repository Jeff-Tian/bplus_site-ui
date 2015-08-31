define([
  "angular",
  "text!./tag.html"
], function(angular, template) {
  var BplusTag = function() {
  };
  BplusTag.prototype.constructor = BplusTag;
  BplusTag.prototype.start = function(agModel) {
    agModel.
    directive("bplustag", function() {
      return {
        restrict: 'E',
        template: template,
        controller: function($scope) {
          //TODO
          //Save tag
          //$scope.taginput.candidates;
          //$scope.taginput.data;
        }
      }
    })
  }
  return BplusTag;
});