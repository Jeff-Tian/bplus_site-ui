angular
    .module('corpModule')
    .directive('captcha', angular.bplus.captcha)
    .directive('corpEdit', ['$rootScope', 'service', 'requestTransformers', 'serviceErrorParser', 'DeviceHelper', function ($rootScope, service, requestTransformers, serviceErrorParser, DeviceHelper) {
        return {
            //scope: {
            //    '*': '='
            //},
            controller: ['$scope', function ($scope) {
                function clearErrorMessages() {
                    $scope.$apply(function () {
                        $rootScope.errorMessages = [];
                    });
                }

                $scope.showAccountInfo = true;
                $scope.modalPassword = function () {
                    if ($scope.$modalPassword) {
                        $scope.$modalPassword.modal({
                            onHide: clearErrorMessages
                        }).modal('show');
                    }
                };
                $scope.modalTelephone = function () {
                    if ($scope.$modalTelephone) {
                        $scope.$modalTelephone.modal({
                            onHide: clearErrorMessages
                        }).modal('show');
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
                        });
                    }).then(function (result) {
                        console.log(result);
                        $scope.corpProfile = result;
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
                    $scope.corpProfile.name = $scope.corpProfile.name || $rootScope.corpBasicInfo.companyName;
                }).then(null, function (reason) {
                    $rootScope.message = serviceErrorParser.getErrorMessage(reason);
                });

                $scope.savingCorpBasicProfile = false;
                $scope.saveCorpBasicInfo = function () {
                    service.executePromiseAvoidDuplicate($scope, 'savingCorpBasicProfile', function () {
                            return service.post($rootScope.config.serviceUrls.corp.member.profile, {
                                company_id: DeviceHelper.getCookie('corp_id'),
                                name: $scope.corpProfile.name,
                                industry: $scope.corpProfile.industry,
                                scale: $scope.corpProfile.scale,
                                nature_of_firms: $scope.corpProfile.nature_of_firms,
                                website: $scope.corpProfile.website,
                                location: $scope.corpProfile.location,
                                contact: $scope.corpProfile.contact,
                                contact_gender: $scope.corpProfile.contact_gender,
                                contact_position: $scope.corpProfile.contact_position
                            });
                        }
                    ).then(function (result) {
                            $rootScope.message = '保存基本信息成功!';
                        })
                        .then(null, serviceErrorParser.handleError)
                    ;
                };

                $scope.savingCorpDescription = false;
                $scope.saveCorpDescription = function () {
                    service.executePromiseAvoidDuplicate($scope, 'savingCorpDescription', function () {
                        return service.post($rootScope.config.serviceUrls.corp.member.profile, {
                            company_id: DeviceHelper.getCookie('corp_id'),
                            abstraction: $scope.corpProfile.abstraction,
                            slogan: $scope.corpProfile.slogan,
                            tags: $scope.corpProfile.tags
                        });
                    })
                        .then(function (result) {
                            $rootScope.message = '保存公司介绍成功!';
                        })
                        .then(null, serviceErrorParser.handleFormError)

                    ;
                };
            }],
            link: function (scope, element, attrs) {
            }
        }
            ;
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
    .directive('modalPassword', ['service', 'serviceErrorParser', '$rootScope', '$compile',
        function (service, serviceErrorParser, $rootScope, $compile) {
            return {
                link: function (scope, element, attrs) {
                    scope.$modalPassword = angular.element(element);

                    scope.changingPassword = false;
                    scope.changePasswordData = {};
                    scope.changePassword = function ($event) {
                        if (!$form.form('is valid')) {
                            return false;
                        }

                        service.executePromiseAvoidDuplicate(scope, 'changingPassword', function () {
                            return service.post($rootScope.config.serviceUrls.corp.member.changePassword, {
                                oldPassword: scope.changePasswordData.oldPassword,
                                password: scope.changePasswordData.newPassword
                            });
                        }).then(function (result) {
                            console.log(result);
                        }).then(null, serviceErrorParser.delegateHandleFormError($form));
                    };

                    var $form = angular.element(element).find('form');
                    $form.form({
                        on: 'blur',
                        fields: {
                            oldPassword: {
                                identifier: 'oldPassword',
                                rules: [{
                                    type: 'empty',
                                    prompt: $form.find('[name=oldPassword]').attr('placeholder')
                                }]
                            },
                            newPassword: {
                                identifier: 'newPassword',
                                rules: [{
                                    type: 'empty',
                                    prompt: $form.find('[name=newPassword]').attr('placeholder')
                                }, {
                                    type: 'different[oldPassword]',
                                    prompt: $form.find('[name=newPassword]').attr('data-prompt')
                                }]
                            },
                            reEnterPassword: {
                                identifier: 'reEnterPassword',
                                rules: [{
                                    type: 'empty',
                                    prompt: $form.find('[name=reEnterPassword]').attr('placeholder')
                                }, {
                                    type: 'match[newPassword]',
                                    prompt: $form.find('[name=reEnterPassword]').attr('data-prompt')
                                }]
                            }
                        },

                        templates: {
                            error: function (errors) {
                                scope.$apply(function () {
                                    $rootScope.errorMessages = errors;
                                });
                                return $compile($('<ul class="list"><li ng-repeat="m in (errorMessages || scope.errorMessages || $root.errorMessages)" ng-bind="m"></li></ul><i class="large remove circle icon" ng-click="errorMessages = scope.errorMessages = $root.errorMessages = undefined"></i>'))(scope);
                            }
                        }
                    });
                }
            };
        }])
    .directive('modalTelephone', ['$rootScope', 'service', 'serviceErrorParser', function ($rootScope, service, serviceErrorParser) {
        return {
            link: function (scope, element, attrs) {
                scope.$modalTelephone = angular.element(element);

                scope.changingMobile = false;
                scope.changeMobile = function () {
                    service.executePromiseAvoidDuplicate(scope, 'changingMobile', function () {
                        return service.post($rootScope.config.serviceUrls.corp.member.changePassword, {
                            mobile: scope.changeMobileData.mobile,
                            verificationCode: scope.changeMobileData.verificationCode,
                            password: scope.changeMobileData.password
                        });
                    })
                        .then(function (result) {
                            $rootScope.message = '修改手机号成功!';
                            scope.$modalTelephone.modal('hide');
                            scope.corpProfile.contact_mobile = scope.changeMobileData.mobile;
                        })
                        .then(null, serviceErrorParser.handleFormError)
                    ;
                };
            }
        };
    }])
    .directive('formEmail', ['service', 'serviceErrorParser', '$rootScope', 'DeviceHelper', function (service, serviceErrorParser, $rootScope, DeviceHelper) {
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
                });

                scope.changingEmail = false;
                scope.changeEmail = function () {
                    if (!$form.form('is valid')) {
                        return false;
                    }

                    service.executePromiseAvoidDuplicate(scope, 'changingEmail', function () {
                        return service.post($rootScope.config.serviceUrls.corp.member.profile, {
                            company_id: DeviceHelper.getCookie('corp_id'),
                            contact_mail: scope.corpProfile.contact_mail
                        });
                    })
                        .then(function (result) {
                            $rootScope.message = '更新 Email 成功!';
                        })
                        .then(null, serviceErrorParser.handleError);
                };
            }
        };
    }])
    .directive('selectionDropdown', [function () {
        return {
            link: function (scope, element, attrs) {
                var $combineBox = angular.element(element);
                $combineBox.dropdown();
            }
        };
    }])
    .directive('combineBox', [function () {
        return {
            link: function (scope, element, attrs) {
                var $combineBox = angular.element(element);
                $combineBox.dropdown({allowAdditions: true});
            }
        };
    }]);