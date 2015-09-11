(function (exports) {
    exports.FormValidation = function ($filter) {
        var res = {
            validChineseMobileNumberPattern: '^(?:(0?86)|[\\(（](0?86)[\\)）])?-?(13\\d|15\\d|14[57]|17\\d|18\\d)(\\d{8})$',
            validEmailRegex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        };

        res.defaultSetting = {
            fields: {
                mobile: {
                    identifier: 'mobile',
                    rules: [{
                        type: 'regExp[' + res.validChineseMobileNumberPattern + ']',
                        prompt: '请输入有效的手机号码'
                    }]
                },

                password: {
                    identifier: 'password',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入密码'
                    }]
                },

                email: {
                    identifier: 'email',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入邮箱地址'
                    }, {
                        type: 'email',
                        prompt: '请输入有效的邮箱地址'
                    }]
                },

                captcha: {
                    identifier: 'captcha',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入验证码'
                    }]
                }
            },

            templates: {
                error: function (errors) {
                    var html = '<ul class="list">';
                    $.each(errors, function (index, value) {
                        html += '<li>' + value + '</li>';
                    });
                    html += '</ul><i class="large remove circle icon" onclick="$(this).closest(\'form\').removeClass(\'error\');"></i>';

                    return $(html);
                }
            }
        };

        res.handleFormError = function ($form, reason) {
            if (reason === null || typeof reason === 'undefined') {
                $form.addClass('error').form('add errors', [$filter('translate')('NoServerResponse') || '未得到服务器响应']);
            } else {
                if (typeof reason === 'object' && typeof reason.code !== 'undefined') {
                    $form.addClass('error').form('add errors', [$filter('translate')(reason.code)]);
                } else {
                    $form.addClass('error').form('add errors', [reason]);
                }
            }
        };

        res.delegateHandleFormError = function ($form) {
            return function (reason) {
                res.handleFormError($form, reason);
            };
        };

        return res;
    };

    exports.FormValidation.$inject = ['$filter'];
})(angular.bplus = angular.bplus || {});