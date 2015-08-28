'use strict';

// Declare app level module which depends on views, and components
angular.module('register', [
    'ui.router',
    'ng.utils'
])
    .config([
        '$urlRouterProvider',
        function ($urlRouterProvider) {
        }
    ])
    .run(function () {

    });

// TODO: integrated into JS framework
(function () {

    // TODO: initial tabs, to be integrated into JS framework
    $('.menu .item')
        .tab({
            //context: '.b-signin-wide .menu .item',
            history: true
        });

    $('.ui.form')
        .form({
            fields: {
                mobile: {
                    identifier: 'mobile',
                    rules: [
                        {
                            type: 'regExp[/^(?:(0?86)|[\\(（](0?86)[\\)）])?-?(13\\d|15\\d|14[57]|17\\d|18\\d)(\\d{8})$/]',
                            prompt: '请输入有效的手机号码'
                        }
                    ]
                },

                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '密码不能为空'
                        }
                    ]
                },

                captcha: {
                    identifier: 'captcha',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入验证码'
                        }
                    ]
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
        });

    $('.ui.form').on('click', '.remove.circle.icon', function () {
        $(this).parent().remove();
    });
})();