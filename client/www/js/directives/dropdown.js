(function (exports) {
    exports.dropdown = function ($timeout) {
        return {
            link: function (scope, element, attrs, ngModel) {
                if (scope.$last) {
                    var $select = $(element).parent();
                    var parentNgModel = $select.attr('ng-model');

                    $timeout(function () {
                        $select.dropdown({
                            onChange: function (value, text, $selectedItem) {
                                console.log(value);
                                var command = 'scope.$parent.' + parentNgModel + ' = value;';
                                console.log(command);
                                eval(command); //jshint ignore: line
                            }
                        });
                    });
                }
            }
        };
    };

    exports.dropdown.$inject = ['$timeout'];
})(angular.bplus = angular.bplus || {});