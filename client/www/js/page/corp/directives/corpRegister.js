angular.module('corpModule')
    .directive('captcha', angular.bplus.captcha)
    .directive('corpRegister', ['$rootScope', 'service', '$filter', function ($rootScope, service, $filter) {
        return {
            template: '' +
            '\
            <link rel="stylesheet" type="text/css"        href="' + $rootScope.config.cdn.normal + 'css/module/form.css?' + $rootScope.config.cdn.version + '">\
            <form class="ui large fluid form register" ng-class="{\'loading\': submitting, error: errorMessages.length}" ng-submit="tryRegister($event)" name="registerForm">\
                <div class="ui error message brand"><ul class="list"><li ng-repeat="m in errorMessages">{{m}}</li></ul><i class="large remove circle icon" ng-click="errorMessages = []"></i> </div>\
                <div class="ui">\
                    <div class="field">\
                        <div class="ui left icon input">\
                            <i class="user icon"></i>\
                            <input type="text" name="username" placeholder="用户名" ng-model="registerData.username" ng-required="true">\
                        </div>\
                    </div>\
                    <div class="field">\
                        <div class="ui left icon input">\
                            <i class="lock icon"></i>\
                            <input type="password" name="password" placeholder="5位以上密码" ng-model="registerData.password" ng-required="true" pattern=".{5,}">\
                        </div>\
                    </div>\
                    <div class="inline field" style="margin-bottom: 5px;">\
                        <div class="ui left icon input">\
                            <i class="pencil icon"></i>\
                            <input type="text" name="captcha" placeholder="请输入图形验证码" ng-model="registerData.captcha" style="width: 162px;" ng-required="true" ng-maxlength="4" maxlength="4">&nbsp;\
                            <div captcha ng-model="registerData.captchaId" style="height: 42px; cursor: pointer;"></div> \
                        </div> \
                    </div>\
                    <div class="right floated field" style="margin-top: 0;">\
                        <a href="javascript: void(0);" ng-click="refreshCaptcha()">换一张</a> \
                    </div> \
                    <div class="field">\
                        <button class="ui fluid red button" ng-disabled="!registerForm.$valid">完成</button> \
                    </div> \
                </div>\
            </form>\
            ',
            scope: {},
            link: function ($scope, $element, attrs) {
                $scope.tryRegister = function ($event) {
                    $scope.submitting = false;
                    service.put($rootScope.config.serviceUrls.corp.member.register, {
                        userName: $scope.registerData.username,
                        password: $scope.registerData.password
                    })
                        .then(function (result) {
                            location.href = '/fill-form?company_id=' + result.company_id + '&member_id=' + result.member_id;
                        }, function (reason) {
                            var errorCode = 'service-' + reason.code;
                            var errorMessage = $filter('translate')(errorCode);
                            if (errorMessage === errorCode) {
                                errorMessage = reason.message;
                            }

                            $scope.errorMessages = [errorMessage];
                        });
                };
            }
        };
    }])
;