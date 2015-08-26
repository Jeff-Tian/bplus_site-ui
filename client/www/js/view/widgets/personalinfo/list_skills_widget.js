define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/view/widgets/personalinfo/list_widget_base",
  "bplus-ui/view/widgets/common/tag",
  "text!./list_skills_widget.html"
], function(when, $, angular, BaseClass, tag, template) {

  var ListSkill = function() {
    BaseClass.call(this);
  }
  ListSkill.prototype = Object.create(BaseClass);
  ListSkill.prototype.constructor = ListSkill;
  
  ListSkill.prototype.start = function(agModel) {
    var me = this;
    agModel.controller("skillscontroller", function($scope){
     $scope.name = "myname"; 
     $scope.ENUM_STATUS = me.ENUM_STATUS;
     $scope.property = me.property;
     $scope.submit = function() {
       $scope.clicked = true;
       //TODO
       //submit function
     };
     $scope.cancel = function() {
       //TODO
       //cancel function
       me.saveEdit();
     };
    }).directive("bplusskills", function(){
      return {
        restrict: 'E',
        template: template
      }
    })
  }
  
  return ListSkill;
});