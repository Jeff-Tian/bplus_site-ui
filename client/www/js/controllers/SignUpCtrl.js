(function (exports) {
    exports.SignUpCtrl = function ($scope, service, queryParser, DeviceHelper) {
        var moduleTrack = new window.ModuleTrack(
            DeviceHelper.isMobile() ? 'm.register' : 'register',
            function(sender, args){
                if(args.hash === 'register'){
                    sender.send(null);
                }
            });

        if (moduleTrack.currentHash() === 'register') {
            moduleTrack.send(null);
        }

        $scope.registerFormCtrl = {};

        $scope.signUp = function () {
            function autoSignIn() {
                service.post('/service-proxy/logon/authentication', {
                    value: signUpData.mobile,
                    password: signUpData.password,
                    wechat_token: queryParser.get('wechat_token')
                })
                    .then(function (json) {
                        window.location.href = $scope.localeUrl('/personal-history');
                    }, $scope.registerFormCtrl.handleFormError);
            }

            var signUpData = $scope.registerFormCtrl.getFormData();

            service.post('/service-proxy/member/register', signUpData)
                .then(autoSignIn, $scope.registerFormCtrl.handleFormError);
        };
    };

    exports.SignUpCtrl.$inject = ['$scope', 'service', 'queryParser', 'DeviceHelper'];
})(angular.bplus = angular.bplus || {});