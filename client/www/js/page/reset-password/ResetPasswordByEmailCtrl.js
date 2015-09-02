(function (exports) {
    exports.ResetPasswordByEmailCtrl = function ($scope) {
        var $shape = $('.shape.reset-by-email');
        $shape.shape();

        var $form = $('.ui.form.reset-by-email');
        $scope.isResetPasswordFormValid = function () {
            if ($scope.resetPasswordForm.$pristine) {
                return false;
            }

            return $form.form('is valid');
        };

        $scope.tryResetPassword = function ($event) {
            if (!$scope.isResetPasswordFormValid()) {
                return;
            }

            $form.form('clear');
            $shape.shape('flip over');

            $event.preventDefault();
        };
    };

    exports.ResetPasswordByEmailCtrl.$inject = ['$scope'];
})(angular.bplus = angular.bplus || {});