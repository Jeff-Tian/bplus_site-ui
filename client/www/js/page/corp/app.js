angular.module('corpModule', ['bplusModule'])
    .directive('corpSignInWidget', [function () {
        return {
            template: '\
            <div class="ui container">\
                <div class="b-sign-in-position-wrapper">\
                    <div class="b-sign-in-position">\
                        <div class="ui b-signin-semi-transparent-wrapper">\
                            <div class="ui column b-signin-semi-transparent-container">\
                                <div class="b-signin-narrow" tab=".b-signin-narrow">\
                                    <div class="ui fluid two item top pointing secondary menu brand">\
                                        <a class="active item" data-tab="login">{{"SignIn" | translate }}</a>\
                                        <a class="item" data-tab="register">{{ "SignUp" | translate }}</a>\
                                    </div>\
                                    <div class="ui bottom attached tab active" data-tab="login">\
                                    <corp-sign-in></corp-sign-in>\
                                    </div>\
                                    <div class="ui bottom attached tab" data-tab="register">\
                                        <div class="ui center aligned container subcontainer mobile">\
                                            <h2 class="grey color">{{ "SignUp" | translate }}</h2>\
                                        </div>\
                                        <div class="field ui right aligned container subcontainer">\
                                            {{ "HasAccount" | translate }} <a href="#/login" ng-click="login()">{{ "SignInNow" | translate }}</a>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>'
            ,
            scope: {},
            link: function ($scope, $element, attrs) {
                angular.element($element).find('.menu.brand .item').tab();
            }
        };
    }])
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