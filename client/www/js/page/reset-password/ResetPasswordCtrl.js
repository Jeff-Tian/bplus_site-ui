(function (exports) {
    exports.ResetPasswordCtrl = function ($scope, $element, $http, FormValidation) {
        $scope.formCtrl = {};

        $scope.resetPassword = function () {
            $http.post('/service-proxy/member/resetPassword', $scope.formCtrl.getFormData())
                .success(function (res) {
                    if (res.isSuccess) {
                        $('.reset.shape').shape('flip over');
                    } else {
                        $scope.formCtrl.handleFormError(res.message);
                    }
                }).error($scope.formCtrl.handleFormError);
        };

        $('.reset.shape').shape();
    };

    exports.ResetPasswordCtrl.$inject = ['$scope', '$element', '$http', 'FormValidation'];
})(angular.bplus = angular.bplus || {});