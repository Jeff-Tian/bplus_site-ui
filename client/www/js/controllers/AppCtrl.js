(function (exports) {
    exports.AppCtrl = function (FormValidation, $scope) {
        var $form = $('.ui.form');
        $form.form(FormValidation.defaultSetting);

        $scope.memberInfo = {};
    };

    exports.AppCtrl.$inject = ['FormValidation', '$scope'];
})(angular.bplus = angular.bplus || {});