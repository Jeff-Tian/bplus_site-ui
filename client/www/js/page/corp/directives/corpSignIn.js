angular.module('corpModule')
    .directive('corpSignIn', [function () {
        return {
            template: '' +
            '\
            <form class="ui large fluid form login" ng-class="{\'loading\': submitting}"\
                  ng-submit="tryLogin($event)"\
                  name="loginForm">\
                <div class="ui error message brand"></div>\
                <div class="ui">\
                    <div class="field">\
                        <div class="ui left icon input">\
                            <i class="user icon"></i>\
                            <input type="text" name="mobile" placeholder="用户名"\
                                   ng-model="loginData.mobile">\
                            </div>\
                        </div>\
                        <div class="field">\
                            <div class="ui left icon input">\
                                <i class="lock icon"></i>\
                                <input type="password" name="password" placeholder="请输入密码"\
                                       ng-model="loginData.password">\
                                </div>\
                            </div>\
                            <div class="fields">\
                                <div class="eight wide field">\
                                    <div class="ui checkbox remember-me" ng-hide="!!loginData.wechatToken"\
                                         ng-cloak>\
                                        <input type="checkbox" ng-model="loginData.rememberMe"\
                                               id="remember-me-check-box">\
                                            <label for="remember-me-check-box">下次自动登录</label>\
                            </div>\
                        </div>\
                        <div class="eight wide field ui right aligned container subcontainer">\
                            <a href="reset-password" ng-click="resetPassword($event)">忘记密码 <i\
                                        class="hidden help circle icon"></i> </a>\
                        </div>\
                    </div>\
                    <div class="ui divider horizontal"></div>\
                    <button loading type="submit" class="ui fluid large red submit button"\
                            ng-disabled="!isLoginFormValid()" ng-cloak>\
                            登录\
                    </button>\
                </div>\
            </form>\
            <div class="ui right aligned container subcontainer">\
                <div>\
                    没有账号? <a href="#register" ng-click="register()">马上注册</a></div>\
                </div>',
            scope: {},
            link: function ($scope, $element, attrs) {

            }
        };
    }])
;