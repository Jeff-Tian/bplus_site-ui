angular.module('corpModule')
    .directive('corpRegister', [function () {
        return {
            template: '' +
            '\
            <form class="ui large fluid form register" ng-class="{\'loading\': submitting}" ng-submit="tryRegister($event)" name="registerForm">\
                <div class="ui error message brand"></div>\
                <div class="ui">\
                    <div class="field">\
                        <div class="ui left icon input">\
                            <i class="user icon"></i>\
                            <input type="text" name="username" placeholder="用户名" ng-model="registerData.username">\
                        </div>\
                    </div>\
                    <div class="field">\
                        <div class="ui left icon input">\
                            <i class="lock icon"></i>\
                            <input type="password" name="password" placeholder="密码" ng-model="registerData.password">\
                        </div>\
                    </div>\
                    <div class="inline field" style="margin-bottom: 5px;">\
                        <div class="ui left icon input">\
                            <i class="pencil icon"></i>\
                            <input type="text" name="captcha" placeholder="请输入图形验证码" ng-model="registerData.captcha" style="width: 162px;">&nbsp;\
                            <img src="http://uat.bridgeplus.cn:10001/captcha/image/ec7a77a0-e50e-11e5-8080-65f5992c37ee?appid=bplus" style="height: 42px;">\
                        </div> \
                    </div>\
                    <div class="right floated field" style="margin-top: 0;">\
                        <a href="">换一张</a> \
                    </div> \
                    <div class="field">\
                        <button class="ui fluid red button">完成</button> \
                    </div> \
                </div>\
            </form>\
            '
            ,
            scope: {},
            link: function ($scope, $element, attrs) {

            }
        };
    }])
;