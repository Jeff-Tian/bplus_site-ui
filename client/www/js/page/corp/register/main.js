angular
    .module('corpModule')
    .directive('corpRegister', ['$rootScope', function ($rootScope) {
        return {
            //scope: { '*': '=' },
            link: function (scope, element, attrs) {
                $rootScope.$corpRegister = angular.element(element);
            }
        };
    }])
    .controller("corpRegister", ['$scope', '$window', '$interval', '$q', '$timeout', function ($scope, $window, $interval, $q, $timeout) {
        var config = {
            secondResendCAPTCHA: 60 * 5
        };

        var $form,
            configForm,
            $btnSendCAPTCHA,
            $inputTelephone,
            timerSendCAPTCHA,
            $countdown,
            timerCountdown
            ;

        $scope.status = -1;

        function getStatus() {
            callbackGetStatus(0);
        }

        $timeout(getStatus, 1000);

        function callbackGetStatus(status) {
            switch (status) {
                case (0):
                    $scope.status = 0;
                    break;
                case (1):
                    $scope.status = 1;
                    break;
                case (2):
                    $scope.status = 2;
                    $scope.$apply();
                    if ((!$countdown || !$countdown.length) && ($scope.$countdown && $scope.$countdown.length)) {
                        $countdown = $scope.$countdown;
                    }
                    if ($countdown && $countdown.length) {
                        timerCountdown = $interval(function () {
                            var n = parseInt($countdown.html());
                            if (n) {
                                $countdown.html(n - 1);
                            } else {
                                $interval.cancel(timerCountdown);
                                $window.location.href = ('/cv');
                            }
                        }, 1000);
                    }
                    break;
                case (3):
                    $scope.status = 3;
                    break;
                default:
                    break;
            }
        }

        $scope.edit = function () {
            callbackGetStatus(0);
        };

        $scope.sendCAPTCHA = function () {
            if ((!$form || !$form.length) && ($scope.$form && $scope.$form.length)) {
                $form = $scope.$form;
            }
            if (!configForm && $scope.configForm) {
                configForm = $scope.configForm;
            }
            if (!$form || !configForm) {
                return;
            }
            if (!$btnSendCAPTCHA || !$btnSendCAPTCHA.length) {
                $btnSendCAPTCHA = $form.find('.btn-sendCAPTCHA');
            }
            if (!$inputTelephone || !$inputTelephone.length) {
                $inputTelephone = $form.find('[name=telephone]');
            }
            if (!$btnSendCAPTCHA || !$btnSendCAPTCHA.length || !$inputTelephone || !$inputTelephone.length) {
                return;
            }
            if ($btnSendCAPTCHA.hasClass('loading') || $btnSendCAPTCHA.hasClass('disabled')) {
                return;
            }
            var isValid = false;
            $form.form({
                on: 'blur',
                inline: true,
                fields: {
                    telephone: {
                        identifier: 'telephone',
                        rules: [{
                            type: 'regExp[/^1\\d{10}$/]',
                            prompt: $form.find('[name=telephone]').attr('data-prompt')
                        }]
                    }
                }
            });
            isValid = $form.form('is valid');
            $form.form(configForm);


            function callbackSendCAPTCHA() {
                $btnSendCAPTCHA.removeClass('loading').addClass('disabled').html(config.secondResendCAPTCHA);
                timerSendCAPTCHA = $interval(function () {
                    var n = parseInt($btnSendCAPTCHA.html());
                    if (n) {
                        $btnSendCAPTCHA.html(n - 1);
                    } else {
                        $interval.cancel(timerSendCAPTCHA);
                        timerSendCAPTCHA = undefined;
                        $btnSendCAPTCHA.removeClass('disabled').html($btnSendCAPTCHA.attr('data-text-resend'));
                    }
                }, 1000);
                $scope.$on('$destroy', function () {
                    $interval.cancel(timerSendCAPTCHA);
                    timerSendCAPTCHA = undefined;
                });
            }

            if (isValid) {
                var valTelephone = $inputTelephone.val();
                $btnSendCAPTCHA.addClass('loading');

                $timeout(callbackSendCAPTCHA, 2000);
            }
        };

        $scope.submit = function () {
            if ((!$form || !$form.length) && ($scope.$form && $scope.$form.length)) {
                $form = $scope.$form;
            }
            if (!$form || !$form.length) {
                return false;
            }
            if ($form.hasClass('loading')) {
                return false;
            }

            function post() {
                $form.removeClass('loading');
                callbackGetStatus(1);
            }

            if ($form.form('is valid')) {
                var vals = $form.form('get values');
                $form.addClass('loading');

                $timeout(post, 2000);
            }
            return false;
        };
    }])
    .directive('corpRegisterForm', ['$rootScope', 'service', 'serviceErrorParser', 'DeviceHelper', function ($rootScope, service, serviceErrorParser, DeviceHelper) {
        return {
            //scope: { '*': '=' },
            link: function (scope, element, attrs) {
                var $form = $rootScope.$form = angular.element(element),
                    configForm = $rootScope.configForm = {
                        on: 'blur',
                        inline: true,
                        fields: {
                            corporation: {
                                identifier: 'corporation',
                                rules: [{
                                    type: 'empty',
                                    prompt: $form.find('[name=corporation]').attr('data-prompt')
                                }]
                            },
                            businesslicense: {
                                identifier: 'businesslicense',
                                rules: [{
                                    type: 'empty',
                                    prompt: $form.find('[name=businesslicense]').attr('data-prompt')
                                }]
                            },
                            city: {
                                identifier: 'city',
                                rules: [{
                                    type: 'empty',
                                    prompt: $form.find('[name=city]').prop('placeholder')
                                }]
                            },
                            contact: {
                                identifier: 'contact',
                                rules: [{
                                    type: 'empty',
                                    prompt: $form.find('[name=contact]').prop('placeholder')
                                }]
                            },
                            position: {
                                identifier: 'position',
                                rules: [{
                                    type: 'empty',
                                    prompt: $form.find('[name=position]').prop('placeholder')
                                }]
                            },
                            email: {
                                identifier: 'email',
                                rules: [{
                                    type: 'email',
                                    prompt: $form.find('[name=email]').attr('data-prompt')
                                }]
                            },
                            telephone: {
                                identifier: 'telephone',
                                rules: [{
                                    type: 'regExp[/^1\\d{10}$/]',
                                    prompt: $form.find('[name=telephone]').attr('data-prompt')
                                }]
                            },
                            CAPTCHA: {
                                identifier: 'CAPTCHA',
                                rules: [{
                                    type: 'empty',
                                    prompt: $form.find('[name=CAPTCHA]').prop('placeholder')
                                }]
                            }
                        }
                    };
                $form.form(configForm);

                scope.saving = false;
                scope.saveBasicCorpInfo = function () {
                    service.executePromiseAvoidDuplicate(scope, 'saving', function () {
                        return service.put($rootScope.config.serviceUrls.corp.member.uploadLicense, {
                            file: scope.data.license,
                            'x:category': 'upload-' + Math.random().toString()
                        }, {
                            headers: {
                                'X-Requested-With': undefined,
                                'Content-Type': undefined
                            },
                            transformRequest: function (data, getHeaders) {
                                function appendFormData(formData, key, value) {
                                    if (value instanceof File) {
                                        formData.append(key, value, value.name);
                                        return;
                                    }

                                    if (value instanceof Blob) {
                                        formData.append(key, value, key + '.png');
                                        return;
                                    }

                                    if (typeof value !== 'undefined') {
                                        formData.append(key, value);
                                        return;
                                    }
                                }

                                var formData = new FormData();
                                angular.forEach(data, function (value, key) {
                                    if (value instanceof Array) {
                                        for (var i = 0; i < value.length; i++) {
                                            appendFormData(formData, key + '[' + i + ']', value[i]);
                                        }
                                    } else {
                                        appendFormData(formData, key, value);
                                    }
                                });

                                return formData;
                            }
                        });
                    })
                        .then(function (data) {
                            scope.data.licenseInfo = data;

                            return service.executePromiseAvoidDuplicate(scope, 'saving', function () {
                                return service.post($rootScope.config.serviceUrls.corp.member.saveBasicInfo, {
                                    name: scope.data.companyName,
                                    company_id: DeviceHelper.getCookie('corp_id'),
                                    location: scope.data.city,
                                    contact: scope.data.contact,
                                    contact_position: scope.data.position,
                                    contact_mail: scope.data.email,
                                    contact_mobile: scope.data.mobile,
                                    business_license_url: '//' + data.host + '/' + data.key
                                });
                            });
                        })
                        .then(function (result) {
                            console.log(result);
                        }, function (reason) {
                            scope.errorMessages = [serviceErrorParser.getErrorMessage(reason)];
                        })
                    ;
                };
            }
        };
    }])
    .directive('corpRegisterCountdown', ['$rootScope', function ($rootScope) {
        return {
            //scope: { '*': '=' },
            link: function (scope, element, attrs) {
                $rootScope.$countdown = angular.element(element);
            }
        };
    }])
    .directive('fileread', [function () {
        return {
            scope: {
                fileread: '='
            },
            link: function (scope, element, attrs) {
                element.bind('change', function (changeEvent) {
                    scope.$apply(function () {
                        scope.fileread = changeEvent.target.files[0];
                        console.log(scope.fileread);
                    });
                });
            }
        }
    }])
;