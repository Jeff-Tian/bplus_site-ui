(function (exports) {
    exports.LoginCtrl = function ($scope, FormValidation, service, MessageStore, $filter) {
        $scope.loginData = {
            mobile: '',
            password: '',
            rememberMe: false
        };

        var $loginForm = $('.ui.form.login');

        $scope.isLoginFormValid = function () {
            if ($scope.loginForm.$pristine) {
                return false;
            }

            return $loginForm.form('is valid');
        };

        var submitting = false;
        $scope.tryLogin = function ($event) {
            $event.preventDefault();

            if (submitting) {
                return;
            }

            if (!$scope.isLoginFormValid()) {
                return;
            }

            submitting = true;
            service.post('/service-proxy/logon/authentication', {
                value: $scope.loginData.mobile,
                password: $scope.loginData.password,
                remember: $scope.loginData.rememberMe
            }).then(function (res) {
                MessageStore.set($filter('translate')('SignedInWelcomeMessage'));

                window.location.href = '/' + angular.bplus.localeHelper.getLocale(window.location.pathname);
            }).catch(FormValidation.delegateHandleFormError($loginForm)).finally(function () {
                submitting = false;
            });
        };
    };

    exports.LoginCtrl.$inject = ['$scope', 'FormValidation', 'service', 'MessageStore', '$filter'];
})(angular.bplus = angular.bplus || {});