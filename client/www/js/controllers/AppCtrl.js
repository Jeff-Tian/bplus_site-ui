(function (exports) {
    exports.AppCtrl = function (FormValidation, $scope, service) {
        var $form = $('.ui.form');
        $form.form(FormValidation.defaultSetting);

        $scope.memberInfo = {};

        service.get('/service-proxy/member/profile/')
            .then(function (res) {
                $scope.memberInfo = res.result;

                $scope.memberInfo.displayName = res.result.nick_name || res.result.name || res.result.real_name || res.result.mobile;
            });
    };

    exports.AppCtrl.$inject = ['FormValidation', '$scope', 'service'];
})(angular.bplus = angular.bplus || {});