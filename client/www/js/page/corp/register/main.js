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
    .controller("corpRegister", ['$scope', '$window', '$interval',  '$q', '$timeout', function($scope, $window, $interval, $q, $timeout) {
        var config = {
            secondResendCAPTCHA: 60 * 5
        };

        var $corpRegister = undefined,
            $form = undefined,
            configForm = undefined,
            $btnSendCAPTCHA = undefined,
            $inputTelephone = undefined,
            timerSendCAPTCHA = undefined,
            $countdown = undefined,
            timerCountdown = undefined;

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
            };
        }

        $scope.edit = function() {
            callbackGetStatus(0);
        }

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
            if (isValid) {
                var valTelephone = $inputTelephone.val();
                $btnSendCAPTCHA.addClass('loading');
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
                    $scope.$on('$destroy', function() {
                        $interval.cancel(timerSendCAPTCHA);
                        timerSendCAPTCHA = undefined;
                    });
                }
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
            if ($form.form('is valid')) {
                var vals = $form.form('get values');
                $form.addClass('loading');
                function post() {
                    $form.removeClass('loading');
                    callbackGetStatus(1);
                }
                $timeout(post, 2000);
            }
            return false;
        };
    }])
    .directive('corpRegisterForm', ['$rootScope', function ($rootScope) {
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
                            //businesslicense: {
                            //    identifier: 'businesslicense',
                            //    rules: [{
                            //        type: 'empty',
                            //        prompt: $form.find('[name=businesslicense]').attr('data-prompt')
                            //    }]
                            //},
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
                $form.on('submit', scope.submit);
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
    }]);