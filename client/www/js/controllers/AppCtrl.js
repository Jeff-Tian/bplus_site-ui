(function (exports) {
    exports.AppCtrl = function (FormValidation, $scope, service, MessageStore, msgBus, $translate) {
        var $form = $('.ui.form');

        $form.form(FormValidation.defaultSetting);
        $form.on('click', '.remove.circle.icon', function () {
            $form.removeClass('error');
        });
        $('.checkbox').checkbox();
        $('.ui.menu.b-header-account .ui.dropdown').dropdown();

        $scope.memberInfo = {};


        $scope.redirectUrl = function(from, to, action) {
            console.log('from:' + from + ',to:' + to + ',action:' + action);
            //todo
            window.location.href = to;
        };

        $scope.fetchProfile = function () {
            return service.get('/service-proxy/member/profile/')
                .then(function (res) {
                    $scope.memberInfo = res;

                    $scope.memberInfo.displayName = res.nick_name || res.name || res.real_name || res.mobile || res.wechat;

                    msgBus.emitMsg(msgBus.events.profile.loaded);

                    if ($scope.message) {
                        $scope.message = $scope.message.replace('{user.name}', $scope.memberInfo.displayName);
                    }

                    return $scope.memberInfo;
                });
        };

        $scope.localeUrl = function (url, locale) {
            locale = locale || $scope.language;

            if (locale) {
                url = '/' + locale + url;
            }

            return url;
        };

        $scope.fetchProfile();

        $scope.message = MessageStore.flash();

        $scope.language = $translate.preferredLanguage();

        $scope.signOut = function () {
            service.post('/service-proxy/logon/logout')
                .finally(function (res) {
                    window.location.href = $scope.localeUrl('/');
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

    exports.AppCtrl.$inject = ['FormValidation', '$scope', 'service', 'MessageStore', 'msgBus', '$translate'];
})(angular.bplus = angular.bplus || {});