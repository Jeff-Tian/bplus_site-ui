(function (exports) {
    exports.ResetPasswordCtrl = function ($scope, $element, service, FormValidation) {
        $scope.formCtrl = {};

        var submitting = false;
        $scope.resetPassword = function () {
            if (submitting) {
                return;
            }

            submitting = true;
            service.post('/service-proxy/member/resetPassword', $scope.formCtrl.getFormData())
                .then(function () {
                    $('.reset.shape').shape('flip over');
                }, $scope.formCtrl.handleFormError)
                .finally(function () {
                    submitting = false;
                });
        };

        $('.reset.shape').shape();
    };

    exports.ResetPasswordCtrl.$inject = ['$scope', '$element', 'service', 'FormValidation'];
})(angular.bplus = angular.bplus || {});