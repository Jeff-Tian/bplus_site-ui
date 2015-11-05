(function (exports) {
    exports.SignUpCtrl = function ($scope, service, queryParser) {
        if(window.location.hash === '#register') {
            window.sendTrack('m.register');
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

    exports.SignUpCtrl.$inject = ['$scope', 'service', 'queryParser'];
})(angular.bplus = angular.bplus || {});