define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/view/widgets/personalinfo/list_widget_base",
  "text!./list_workingexperience_widget.html"
], function(when, $, angular, BaseClass, template) {
  var ListWorkingBackground = function() {
    BaseClass.call(this);
  }
  ListWorkingBackground.prototype = Object.create(BaseClass.prototype);
  ListWorkingBackground.prototype.constructor = ListWorkingBackground;
  
  ListWorkingBackground.prototype.start = function(agModel) {
    var me = this;
    agModel
    .directive("bplusworkexperience", function(){
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
               $scope.dateFrom = {
                 config: {
                   showYear: true,
                   showMonth: true,
                   showDay: false,
                   display: true
                 },
                 value: $scope.data.dateFrom.value,
                 fulfilled: false
               };
               $scope.dateTo = {
                 config: {
                   showYear: true,
                   showMonth: true,
                   showDay: false,
                   display: false
                 },
                 value: $scope.data.dateTo.value,
                 fulfilled: false,
               };
               $scope.$watch("dateFrom.value", function(newValue, oldValue) {
                 if (newValue !== oldValue) {
                   $scope.dateTo.value.year = "";
                   $scope.dateTo.value.month = "";
                   $scope.dateTo.value.day = "";
                 }
                 if (newValue && newValue.year && newValue.month) {
                   $scope.dateTo.config.begin = {
                     year: $scope.dateFrom.value.year,
                     month: $scope.dateFrom.value.month - 1
                   }
                   $scope.dateTo.config.display = $scope.dateTo.config.display === "true1" ? true : "true1";
                 } else {
                   $scope.dateTo.config.display = false;
                 }
               }, true)
               me.createActions($scope, "workexperience", false, true, true);
               $scope.submit = function() {
                 $scope.clicked = true;
                 if (!!(!$scope.dateTo.fulfilled || !$scope.dateFrom.fulfilled || $scope.workexperience.$error.required)) {
                   return;
                 }
                 if (me.submit) {
                   me.submit($scope);
                 }
               };
            }
          }
        }
      };
    });
  }
  
  return ListWorkingBackground;
});