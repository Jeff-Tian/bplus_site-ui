define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/view/widgets/personalinfo/list_widget_base",
  "bplus-ui/view/widgets/common/tag",
  "text!./list_skills_widget.html"
], function(when, $, angular, BaseClass, Tag, template) {

  var ListSkill = function() {
    BaseClass.call(this);
  }
  ListSkill.prototype = Object.create(BaseClass);
  ListSkill.prototype.constructor = ListSkill;
  
  ListSkill.prototype.start = function(agModel) {
    var me = this;
    agModel.controller("skillscontroller", function($scope){
     $scope.ENUM_STATUS = me.ENUM_STATUS;
     $scope.property = me.property;
     var tags = [];
     $scope.skill = me.data = {
       name: "",
       description: "",
       tags: tags
     };
     $scope.taginput = {
         candidates: [],
         data: tags
       }
     $scope.submit = function() {
       $scope.clicked = true;
       //TODO
       //submit function
     };
     $scope.cancel = function() {
       debugger;
       //TODO
       //cancel function
     };
    })
    .directive("bplusskills", function(){
      return {
        restrict: 'E',
        template: template,
      };
    })
    new Tag().start(agModel);
  }
  
  return ListSkill;
});