(function (exports) {
    exports.FormValidation = function ($filter) {
        var res = {
            validChineseMobileNumberPattern: '^(?:(0?86)|[\\(（](0?86)[\\)）])?-?(13\\d|15\\d|14[57]|17\\d|18\\d)(\\d{8})$',
            validEmailRegex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        };

        var translate = $filter('translate');

        res.defaultSetting = {
            fields: {
                mobile: {
                    identifier: 'mobile',
                    rules: [{
                        type: 'regExp[' + res.validChineseMobileNumberPattern + ']',
                        prompt: translate('PleaseInputValidMobileNumber')
                    }]
                },

                password: {
                    identifier: 'password',
                    rules: [{
                        type: 'empty',
                        prompt: translate('PleaseInputPassword')
                    }]
                },

                email: {
                    identifier: 'email',
                    rules: [{
                        type: 'empty',
                        prompt: translate('PleaseInputEmail')
                    }, {
                        type: 'email',
                        prompt: translate('PleaseInputValidEmail')
                    }]
                },

                captcha: {
                    identifier: 'captcha',
                    rules: [{
                        type: 'empty',
                        prompt: translate('PleaseInputCaptcha')
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
                    $form.addClass('error').form('add errors', [translate(reason.code)]);
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