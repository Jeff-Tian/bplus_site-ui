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
  };
  ListPersonalInfo.prototype = Object.create(BaseClass.prototype);
  ListPersonalInfo.prototype.constructor = ListPersonalInfo;
  
  ListPersonalInfo.prototype.start = function(agModel) {
    var me = this;
    agModel
    .directive("bpluspersonalinfo", function(){
      return {
        restrict: 'E',
        template: template,
        scope: {
          data: "=",
        },
        compile: function() {
          return {
            pre: function($scope) {
              $scope.ENUM_STATUS = me.ENUM_STATUS;
              $scope.property = {
                status: ($scope.data.name === "") ? me.ENUM_STATUS.STATUS_EDIT : me.ENUM_STATUS.STATUS_READONLY
              };
               $scope.dateSelect = {
                 config: {
                   showYear: true,
                   showMonth: true,
                   showDay: true,
                   display: true
                 },
                 value: $scope.data.dateOfBirth.value,
                 fulfilled: false
               };
               me.createActions($scope, "personalinfo", false, true, true);
               $scope.submit = function() {
                 $scope.clicked = true;
                 if (!!(!$scope.dateSelect.fulfilled  || $scope.personalinfo.$error.required)) {
                   return;
                 }
                 if (me.submit) {
                   me.submit($scope);
                 }
               };
            }
          };
        }
      };
    });
    new DateSelect().start(agModel);
  };
  
  return ListPersonalInfo;
});