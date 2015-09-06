define([
  "when",
  "jquery"
], function(when, $) {
  var ListWidgetBase = function() {
    Object.call(this);
    var me = this;
    this.ENUM_STATUS = {
      STATUS_EDIT: "status.edit",
      STATUS_READONLY: "status.readonly"
    };
    this.createActions = function($scope, submitAction, cancelAction, editAction) {
      if (submitAction) {
        $scope.submit = function() {
          $scope.clicked = true;
          var promise;
          if ($scope && $scope.$parent) {
            promise = $scope.$parent.submit();
          }
          promise.then(function() {
            $scope.property.status = $scope.ENUM_STATUS.STATUS_READONLY;
            $scope.$apply();
          })
        };
      } else {
        me.submit = function() {
          var promise = when();
          if ($scope && $scope.$parent) {
            promise = $scope.$parent.submit();
          }
          promise.then(function() {
            $scope.property.status = $scope.ENUM_STATUS.STATUS_READONLY;
            $scope.$apply();
          })
        }
      }
      if (cancelAction) {
        $scope.cancel = function() {
          $scope.property.status = $scope.ENUM_STATUS.STATUS_READONLY;
          if ($scope && $scope.$parent) {
            $scope.$parent.cancel();
          }
        };
      }
      if (editAction) {
        $scope.edit = function() {
          $scope.property.status = $scope.ENUM_STATUS.STATUS_EDIT;
        }
      }
    }
  };
  ListWidgetBase.prototype = Object.create(Object.prototype);
  ListWidgetBase.prototype.constructor = ListWidgetBase;
  
  return ListWidgetBase;
});
