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
    this.submit = function($scope) {
      var promise = when();
      if ($scope && $scope.$parent) {
        promise = $scope.$parent.submit($scope.data);
      }
      promise.then(function() {
        $scope.property.status = $scope.ENUM_STATUS.STATUS_READONLY;
        $scope.$apply();
      })
    };
    this.createActions = function($scope, formname, submitAction, cancelAction, editAction) {
      if (submitAction) {
        $scope.submit = function() {
          $scope.clicked = true;
          if (!!$scope[formname].$error.required) {
            return;
          }
          var promise;
          if ($scope && $scope.$parent) {
            promise = $scope.$parent.submit($scope.data);
          }
          promise.then(function() {
            $scope.property.status = $scope.ENUM_STATUS.STATUS_READONLY;
            $scope.$apply();
          })
        };
      }
      if (cancelAction) {
        $scope.cancel = function() {
          $scope.property.status = $scope.ENUM_STATUS.STATUS_READONLY;
          if ($scope && $scope.$parent) {
            $scope.$parent.cancel($scope.data);
          }
        };
      }
      if (editAction) {
        $scope.edit = function() {
          $scope.property.status = $scope.ENUM_STATUS.STATUS_EDIT;
          if ($scope && $scope.$parent) {
            $scope.$parent.edit($scope.data);
          }
        }
      }
    }
  };
  ListWidgetBase.prototype = Object.create(Object.prototype);
  ListWidgetBase.prototype.constructor = ListWidgetBase;
  
  return ListWidgetBase;
});
