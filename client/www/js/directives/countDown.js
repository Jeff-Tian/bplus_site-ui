(function (exports) {
    exports.countDown = function (service, $timeout, msgBus) {
        return {
            restrict: 'A',
            scope: {},
            link: function ($scope, $element, attrs, ngModel) {
                function countDown(value) {
                    if (value <= 0) {
                        window.location.href = attrs.href;
                        return;
                    } else {
                        value--;
                        $element.text(value);

                        $timeout(function () {
                            countDown(value);
                        }, 1000);
                    }
                }

                countDown(Number($element.val() || $element.text()));
            }
        };
    };

    exports.countDown.$inject = ['service', '$timeout', 'msgBus'];
})(angular.bplus = angular.bplus || {});