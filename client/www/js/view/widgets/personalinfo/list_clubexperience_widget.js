define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/view/widgets/personalinfo/list_widget_base",
  "text!./list_clubexperience_widget.html"
], function(when, $, angular, BaseClass, template) {
  var ListClubBackground = function() {
    BaseClass.call(this);
  }
  ListClubBackground.prototype = Object.create(BaseClass.prototype);
  ListClubBackground.prototype.constructor = ListClubBackground;
  
  ListClubBackground.prototype.start = function(agModel) {
    var me = this;
    agModel
    .directive("bplusclubexperience", function(){
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
                status: ($scope.data.name === "") 
                ? me.ENUM_STATUS.STATUS_EDIT
                : me.ENUM_STATUS.STATUS_READONLY
              };
               $scope.dateFrom = {
                 config: {
                   showYear: true,
                   showMonth: true,
                   showDay: false,
                   display: true
                 },
                 value: $scope.data.dateFrom.value,
                 fullfilled: false
               };
               $scope.dateTo = {
                 config: {
                   showYear: true,
                   showMonth: true,
                   showDay: false,
                   display: false
                 },
                 value: $scope.data.dateTo.value,
                 fullfilled: false,
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
               me.createActions($scope, false, true, true);
               $scope.submit = function() {
                 $scope.clicked = true;
                 if ($scope.clicked && (!$scope.dateTo.fullfilled || !$scope.dateTo.fullfilled || $scope.clubbackground.$error.required)) {
                   return;
                 }
                 if (me.submit) {
                   me.submit();
                 }
               };
            }
          }
        }
      };
    });
  }
  
  return ListClubBackground;
});