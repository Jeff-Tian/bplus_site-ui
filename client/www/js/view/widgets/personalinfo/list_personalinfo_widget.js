define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/view/widgets/personalinfo/list_widget_base",
  "bplus-ui/view/widgets/common/date",
  "text!./list_personalinfo_widget.html"
], function(when, $, angular, BaseClass, DateSelect, template) {
  
  var ListPersonalInfo = function() {
    BaseClass.call(this);
  }
  ListPersonalInfo.prototype = Object.create(BaseClass);
  ListPersonalInfo.prototype.constructor = ListPersonalInfo;
  
  ListPersonalInfo.prototype.start = function(agModel) {
    var me = this;
    var bModel = agModel.controller("personalinfocontroller", function($scope){
     $scope.ENUM_STATUS = me.ENUM_STATUS;
     $scope.property = me.property;
     var tags = [];
     $scope.dateSelect = {
       config: {
         showYear: true,
         showMonth: true,
         showDay: true
       },
       value: {
         year: "",
         month: "",
         day: ""
       },
       fullfilled: false
     };
     $scope.data = me.data = {
       name: "",
       gender: "",
       dateOfBirth: {
         value: $scope.dateSelect.value,
         isPrivate: false
       },
       location: "",
       contractInfo: {
         value: "",
         isPrivate: false
       }
     };
     $scope.submit = function() {
       $scope.clicked = true;
       //TODO
       //submit function
     };
     $scope.cancel = function() {
       //TODO
       //cancel function
       //origin data
     };
    })
    .directive("bpluspersonalinfo", function(){
      return {
        restrict: 'E',
        template: template
      };
    })
    new DateSelect().start(agModel);
  }
  
  return ListPersonalInfo;
});