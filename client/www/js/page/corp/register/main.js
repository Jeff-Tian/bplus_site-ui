angular
    .module('corpModule')
    .controller("corpRegister", ['$scope', '$q', '$timeout', function($scope, $q, $timeout) {
        $scope.state = -1;

        $timeout(function () {
            callbackGetState(3);
        }, 1000);

        function callbackGetState(state) {
            switch (state) {
                case (0):
                    $scope.state = 0;
                    main();
                    break;
                case (1):
                    $scope.state = 1;
                    break;
                case (2):
                    $scope.state = 2;
                    break;
                case (3):
                    $scope.state = 3;
                    break;
                default:
                    break;
            };
        }

        $scope.edit = function() {
            callbackGetState(0);
        }

        function main() {
            ;
        }
    }]);