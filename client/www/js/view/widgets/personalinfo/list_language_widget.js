define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/view/widgets/personalinfo/list_widget_base",
  "text!./list_language_widget.html"
], function(when, $, angular, BaseClass, template) {

  var ListLanguage = function() {
    BaseClass.call(this);
  };
  ListLanguage.prototype = Object.create(BaseClass.prototype);
  ListLanguage.prototype.constructor = ListLanguage;
  
  ListLanguage.prototype.start = function(agModel) {
    var me = this;
    agModel
    .directive("bpluslanguage", function(){
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
              me.createActions($scope, "language", true, true, true);
            }
          };
        }
      };
    });
  };
  
  return ListLanguage;
});