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
                        html += '<li>' + translate(value) + '</li>';
                    });
                    html += '</ul><i class="large remove circle icon" onclick="$(this).closest(\'form\').removeClass(\'error\');"></i>';

                    return $(html);
                }
            }
        };

        res.handleFormError = function ($form, reason, args) {
            function format(f, values) {
                if (arguments.length <= 1) {
                    return f;
                } else {
                    var args = Array.prototype.slice.call(arguments, 1, arguments.length);

                    var s = f.replace(/(?:[^{]|^|\b|)(?:{{)*(?:{(\d+)}){1}(?:}})*(?=[^}]|$|\b)/g, function (match, number) {
                        number = parseInt(number);

                        return typeof args[number] !== "undefined" ? match.replace(/{\d+}/g, args[number]) : match;
                    });

                    return s.replace(/{{/g, "{").replace(/}}/g, "}");
                }
            }

            function message(m) {
                if (a.length > 2) {
                    return format.apply(this, [m].concat(Array.prototype.slice.call(a, 2, a.length)));
                }

                return m;
            }

            var a = arguments;

            if (reason === null || typeof reason === 'undefined') {
                $form.addClass('error').form('add errors', [translate('NoResponseFromServer') || '未得到服务器响应']);
            } else {
                if (typeof reason === 'object' && typeof reason.code !== 'undefined') {
                    $form.addClass('error').form('add errors', [message(translate(reason.code))]);
                } else {
                    $form.addClass('error').form('add errors', [typeof reason === 'string' ? message(reason) : reason]);
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