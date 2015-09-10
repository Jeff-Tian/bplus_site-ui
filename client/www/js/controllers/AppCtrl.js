(function (exports) {
    exports.AppCtrl = function (FormValidation, $scope, service, MessageStore) {
        var $form = $('.ui.form');
        $form.form(FormValidation.defaultSetting);

        $scope.memberInfo = {};

        service.get('/service-proxy/member/profile/')
            .then(function (res) {
                $scope.memberInfo = res;

                $scope.memberInfo.displayName = res.nick_name || res.name || res.real_name || res.mobile;

                if ($scope.message) {
                    $scope.message = $scope.message.replace('{user.name}', $scope.memberInfo.displayName);
                }
            });

        $scope.message = MessageStore.flash();

        $scope.signOut = function () {
            service.post('/service-proxy/logon/logout')
                .finally(function (res) {
                    window.location.href = '/';
                });
        };
    };

    exports.AppCtrl.$inject = ['FormValidation', '$scope', 'service', 'MessageStore'];
})(angular.bplus = angular.bplus || {});