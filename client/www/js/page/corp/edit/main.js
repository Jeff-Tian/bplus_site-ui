angular
    .module('corpModule')
    .directive('corpEdit', [function () {
        return {
            //scope: {
            //    '*': '='
            //},
            controller: ['$scope', '$http', function ($scope, $http) {
                $scope.completion = 0;
                $scope.showAccountInfo = true;

                $scope.modalPassword = function () {
                    $scope.$modalPassword && $scope.$modalPassword.modal('show');
                };
                $scope.modalTelephone = function () {
                    $scope.$modalTelephone && $scope.$modalTelephone.modal('show');
                };

                $http({
                    url: '/js/page/corp/edit/data.json',
                    method: 'GET'
                }).then(function (response) {
                    if (response && response.status == 200 && response.statusText && response.statusText.toString().toLowerCase() == 'ok' && response.data) {
                        var data = response.data;
                        if (data.completion) {
                            $scope.completion = data.completion;
                        }
                        if (data.logo) {
                            $scope.logo = data.logo;
                        }
                        if (data.username) {
                            $scope.username = data.username;
                        }
                        if (data.telephone) {
                            $scope.telephone = data.telephone.toString().replace(/^(\d{3})\d{6}(\d{2})$/, '$1' + '******' + '$2');
                        }
                        if (data.email) {
                            $scope.email = data.email;
                        }
                        if (data.slogan) {
                            $scope.slogan = data.slogan;
                        }
                        if (data.description) {
                            $scope.description = data.description;
                        }
                        if (data.tags) {
                            $scope.tags = data.tags;
                        }
                    }
                });
            }],
            link: function (scope, element, attrs) {
                ;
            }
        };
    }])
    .directive('formUsername', ['$timeout', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
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
                        $timeout(function () {
                            $form.removeClass('loading');
                        }, 3000);
                    }
                    return false;
                });
            }
        };
    }])
    .directive('modalPassword', [function () {
        return {
            link: function (scope, element, attrs) {
                scope.$modalPassword = angular.element(element);
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
                        $timeout(function () {
                            $form.removeClass('loading');
                        }, 3000);
                    }
                    return false;
                });
            }
        };
    }])
    .directive('formBasicInfo', ['$timeout', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                var $form = angular.element(element);
                $form.on('submit', function () {
                    if (!$form.hasClass('loading')) {
                        $form.addClass('loading');
                        var vals = $form.form('get values');
                        console.log(vals);
                        $timeout(function () {
                            $form.removeClass('loading');
                        }, 3000);
                    }
                    return false;
                });
            }
        };
    }])
    .directive('formCompanyInfo', ['$timeout', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                var $form = angular.element(element);
                $form.on('submit', function () {
                    if (!$form.hasClass('loading')) {
                        $form.addClass('loading');
                        var vals = $form.form('get values');
                        console.log(vals);
                        $timeout(function () {
                            $form.removeClass('loading');
                        }, 3000);
                    }
                    return false;
                });
            }
        };
    }]);