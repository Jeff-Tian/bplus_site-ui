(function (exports) {
    exports.AppCtrl = function (FormValidation) {
        var $form = $('.ui.form');
        $form.form(FormValidation.defaultSetting);
    };

    exports.AppCtrl.$inject = ['FormValidation'];
})(angular.bplus = angular.bplus || {});