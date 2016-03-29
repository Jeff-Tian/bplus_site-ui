angular
    .module('corpModule')
    .directive('corpEdit', ['$rootScope', 'service', 'requestTransformers', 'serviceErrorParser', 'DeviceHelper', function ($rootScope, service, requestTransformers, serviceErrorParser, DeviceHelper) {
        return {
            //scope: {
            //    '*': '='
            //},
            controller: ['$scope', function ($scope) {
                $scope.showAccountInfo = true;
                $scope.modalPassword = function () {
                    if ($scope.$modalPassword) {
                        $scope.$modalPassword.modal('show');
                    }
                };
                $scope.modalTelephone = function () {
                    if ($scope.$modalTelephone) {
                        $scope.$modalTelephone.modal('show');
                    }
                };

                $scope.uploading = false;
                $scope.fileChanged = function (avatar) {
                    service.executePromiseAvoidDuplicate($scope, 'uploading', function () {
                        return service.put($rootScope.config.serviceUrls.corp.member.uploadProfile, {
                            file: avatar,
                            'x:category': 'upload-' + Math.random().toString()
                        }, {
                            headers: {
                                'X-Requested-With': undefined,
                                'Content-Type': undefined
                            },
                            transformRequest: requestTransformers.transformToFormData
                        });
                    }).then(function (result) {
                        console.log(result);
                        $scope.avatarUrl = '//' + result.host + '/' + result.key + '';

                        service.executePromiseAvoidDuplicate($scope, 'uploading', function () {
                            return service.post($rootScope.config.serviceUrls.corp.member.profile, {
                                company_id: DeviceHelper.getCookie('corp_id'),
                                logo: $scope.avatarUrl
                            });
                        })
                    }).then(function (result) {
                        console.log(result);

                    }, function (reason) {
                        console.error(reason);
                        $rootScope.message = serviceErrorParser.getErrorMessage(reason);
                    });
                };

                $scope.fetchingData = false;
                service.executePromiseAvoidDuplicate($scope, 'fetchingData', function () {
                    return service.get($rootScope.config.serviceUrls.corp.member.profile, {
                        params: {
                            company_id: DeviceHelper.getCookie('corp_id')
                        }
                    });
                }).then(function (result) {
                    console.log(result);
                    $scope.avatarUrl = result.logo;
                    $scope.corpProfile = result;
                }).then(null, function (reason) {
                    $rootScope.message = serviceErrorParser.getErrorMessage(reason);
                });
            }],
            link: function (scope, element, attrs) {
            }
        };
    }])
    .directive('formUsername', ['service', 'serviceErrorParser', '$rootScope', function (service, serviceErrorParser, $rootScope) {
        return {
            link: function (scope, element, attrs) {
                scope.loadingSSO = false;
                service.executePromiseAvoidDuplicate(scope, 'loadingSSO', function () {
                    return service.get($rootScope.config.serviceUrls.corp.member.ssoInfo);
                }).then(function (result) {
                    scope.ssoInfo = result;
                }).then(null, serviceErrorParser.handleError);

                var $form = angular.element(element);
                $form.form({
                    on: 'blur',
                    inline: true,
                    fields: {
                        username: {
                            identifier: 'username',
                            rules: [{
                                type: 'empty',
                                prompt: $form.find('[name=username]').attr('data-prompt')
                            }]
                        }
                    }
                }).on('submit', function () {
                    if (!$form.hasClass('loading') && $form.form('is valid')) {
                        $form.addClass('loading');
                    }
                    return false;
                });
            }
        };
    }])
    .directive('modalPassword', ['service', 'serviceErrorParser', function (service, serviceErrorParser) {
        return {
            link: function (scope, element, attrs) {
                scope.$modalPassword = angular.element(element);

                scope.changingPassword = false;
                scope.changePassword = function () {
                    service.executePromiseAvoidDuplicate(scope, 'changingPassword', function () {
                        return service.post($rootScope.config.serviceUrls.corp.member.changePassword, {
                            oldPassword: scope.changePasswordData.oldPassword,
                            password: scope.changePasswordData.newPassword
                        });
                    }).then(function (result) {
                        console.log(result);
                    }).then(null, serviceErrorParser.handleFormError);
                };
            }
        };
    }])
    .directive('modalTelephone', [function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                scope.$modalTelephone = angular.element(element);
            }
        };
    }])
    .directive('formEmail', [function () {
        return {
            link: function (scope, element, attrs) {
                var $form = angular.element(element);
                $form.form({
                    on: 'blur',
                    inline: true,
                    fields: {
                        email: {
                            identifier: 'email',
                            rules: [{
                                type: 'email',
                                prompt: $form.find('[name=email]').attr('data-prompt')
                            }]
                        }
                    }
                }).on('submit', function () {
                    if (!$form.hasClass('loading') && $form.form('is valid')) {
                        $form.addClass('loading');
                    }
                    return false;
                });
            }
        };
    }]);