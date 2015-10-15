(function (exports) {
    exports.SignUpCtrl = function ($scope, service) {
        $scope.registerFormCtrl = {};

        $scope.signUp = function () {
            function autoSignIn() {
                service.post('/service-proxy/logon/authentication', {
                    value: signUpData.mobile,
                    password: signUpData.password
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

    exports.SignUpCtrl.$inject = ['$scope', 'service'];
})(angular.bplus = angular.bplus || {});