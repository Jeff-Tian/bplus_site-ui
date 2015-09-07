(function (exports) {
    exports.ResetPasswordCtrl = function ($scope, $element) {
        $scope.resetPassword = function () {
            $('.reset.shape').shape('flip over');
        };

        $('.reset.shape').shape();
        var $form = $($element).find('form');
        $form.form({
            on: 'blur',
            inline: true,
            fields: {
                email: {
                    identifier: 'email',
                    rules: [{
                        type: 'empty',
                        prompt: '请填写邮箱地址'
                    }, {
                        type: 'email',
                        prompt: '请填写有效的邮箱地址'
                    }]
                },
                captcha: {
                    identifier: 'captcha',
                    rules: [{
                        type: 'empty',
                        prompt: '请填写验证码'
                    }]
                }
            }
        });
    };

    exports.ResetPasswordCtrl.$inject = ['$scope'];
})(angular.bplus = angular.bplus || {});