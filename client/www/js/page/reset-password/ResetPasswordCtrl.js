(function (exports) {
    exports.ResetPasswordCtrl = function ($scope, $element, $http, FormValidation) {
        $scope.formCtrl = {};

        $scope.resetPassword = function () {
            $http.post('/service-proxy/member/resetPassword', {})
                .success(function (res) {
                    if (res.isSuccess) {
                        $('.reset.shape').shape('flip over');
                    } else {
                        FormValidation.handleFormError($form, res.message);
                    }
                }).error(FormValidation.delegateHandleFormError($form));
        };

        $('.reset.shape').shape();
        var $form = $('.reset-password-side').find('form');
        
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

    exports.ResetPasswordCtrl.$inject = ['$scope', '$element', '$http', 'FormValidation'];
})(angular.bplus = angular.bplus || {});