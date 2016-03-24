angular
    .module('corpModule')
    .directive('corpEdit', ['$rootScope', function ($rootScope) {
        return {
            //scope: {
            //    '*': '='
            //},
            controller: ['$scope', function ($scope) {
                $scope.showAccountInfo = true;
                $scope.modalPassword = function () {
                    $scope.$modalPassword && $scope.$modalPassword.modal('show');
                };
                $scope.modalTelephone = function () {
                    $scope.$modalTelephone && $scope.$modalTelephone.modal('show');
                };
            }],
            link: function (scope, element, attrs) {
                ;
            }
        };
    }])
    .directive('formUsername', [function () {
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
                    }
                    return false;
                });
            }
        };
    }]);