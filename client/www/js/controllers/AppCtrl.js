(function (exports) {
    exports.AppCtrl = function (FormValidation, $scope, service, MessageStore, msgBus) {
        var $form = $('.ui.form');

        $form.form(FormValidation.defaultSetting);
        $form.on('click', '.remove.circle.icon', function () {
            $form.removeClass('error');
        });
        $('.checkbox').checkbox();
        $('.ui.menu.b-header-account .ui.dropdown').dropdown();

        $scope.memberInfo = {};

        $scope.fetchProfile = function () {
            service.get('/service-proxy/member/profile/')
                .then(function (res) {
                    $scope.memberInfo = res;

                    $scope.memberInfo.displayName = res.nick_name || res.name || res.real_name || res.mobile;

                    msgBus.emitMsg(msgBus.events.profile.loaded);

                    if ($scope.message) {
                        $scope.message = $scope.message.replace('{user.name}', $scope.memberInfo.displayName);
                    }
                });
        };

        $scope.fetchProfile();

        $scope.message = MessageStore.flash();

        $scope.signOut = function () {
            service.post('/service-proxy/logon/logout')
                .finally(function (res) {
                    window.location.href = '/';
                });
        };

        function locationHashChanged() {
            $scope.$apply(function () {
                $scope.hash = window.location.hash;
            });
        }

        $scope.hash = window.location.hash;
        window.addEventListener('load', locationHashChanged);
        window.addEventListener('hashchange', locationHashChanged);
    };

    exports.AppCtrl.$inject = ['FormValidation', '$scope', 'service', 'MessageStore', 'msgBus'];
})(angular.bplus = angular.bplus || {});