define([
  "when",
  "jquery",
  "angular"
], function(when, $, angular) {
  var ListWidgetContainer = function() {
    Object.call(this);
  };
  
  ListWidgetContainer.prototype = Object.create(Object.prototype);
  ListWidgetContainer.prototype.constructor = ListWidgetContainer;
  
  ListWidgetContainer.prototype.start = function(agModel, template) {
    agModel.controller("containercontroller", function($scope){
      
    })
    .directive("bpluslistcontainer", function(){
      debugger;
      return {
        restrict: 'E',
        template: template,
      };
    })
  }
  
  return ListWidgetContainer;
});
