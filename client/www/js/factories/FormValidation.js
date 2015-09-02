(function (exports) {
    exports.FormValidation = function () {
        var res = {
            validChineseMobileNumberPattern: '^(?:(0?86)|[\\(（](0?86)[\\)）])?-?(13\\d|15\\d|14[57]|17\\d|18\\d)(\\d{8})$'
        };

        res.defaultSetting = {
            fields: {
                mobile: {
                    identifier: 'mobile',
                    rules: [{
                        type: 'empty',
                        prompt: '请输入手机号码'
                    }, {
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
                    html += '</ul><i class="large remove circle icon"></i>';

                    return $(html);
                }
            }
        };

        return res;
    };

    exports.FormValidation.$inject = [];
})(angular.bplus = angular.bplus || {});