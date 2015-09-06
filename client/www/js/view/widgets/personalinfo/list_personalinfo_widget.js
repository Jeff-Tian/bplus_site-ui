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
                status: ($scope.data.name === "" && $scope.data.gender === "")
                ? me.ENUM_STATUS.STATUS_EDIT
                : me.ENUM_STATUS.STATUS_READONLY
              };
//            $scope.data = {
//              name: "",
//              gender: "",
//              dateOfBirth: {
//                value: {
//                  year: "",
//                  month: "",
//                  day: ""
//                },
//                isPrivate: false
//              },
//              location: "",
//              contractInfo: {
//                value: "",
//                isPrivate: false
//              }
//            };
               $scope.dateSelect = {
                 config: {
                   showYear: true,
                   showMonth: true,
                   showDay: true
                 },
                 value: $scope.data.dateOfBirth.value,
                 fullfilled: false
               };
               $scope.submit = function() {
                 $scope.clicked = true;
                 debugger;
                 //TODO
                 //submit function
                 if ($scope.clicked && (!$scope.dateSelect.fullfilled || $scope.data.gender ==='' || $scope.personalinfo.$error.required)) {
                   return;
                 }
                 var promise;
                 if ($scope && $scope.$parent) {
                   promise = $scope.$parent.submit();
                 }
                 promise.then(function() {
                   $scope.property.status = $scope.ENUM_STATUS.STATUS_READONLY;
                 })
               };
               $scope.cancel = function() {
                 $scope.property.status = $scope.ENUM_STATUS.STATUS_READONLY;
                 if ($scope && $scope.$parent) {
                   $scope.$parent.cancel();
                 }
               };
               $scope.edit = function() {
                 $scope.property.status = $scope.ENUM_STATUS.STATUS_EDIT;
               }
            }
          }
        }
      };
    });
    new DateSelect().start(agModel);
  }
  //TODO
  //Known bug, the date value can't be shown on select widget
  
  return ListPersonalInfo;
});