define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/view/widgets/personalinfo/list_widget_base",
  "text!./list_award_widget.html"
], function(when, $, angular, BaseClass, template) {
  var ListAward = function() {
    BaseClass.call(this);
  }
  ListAward.prototype = Object.create(BaseClass.prototype);
  ListAward.prototype.constructor = ListAward;
  
  ListAward.prototype.start = function(agModel) {
    var me = this;
    agModel
    .directive("bplusaward", function(){
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
                   showDay: false,
                   display: true
                 },
                 value: $scope.data.prizeDate.value,
                 fulfilled: false
               };
               me.createActions($scope, "award", false, true, true);
               $scope.submit = function() {
                 $scope.clicked = true;
                 if (!!(!$scope.dateSelect.fulfilled || $scope.award.$error.required)) {
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
  
  return ListAward;
});