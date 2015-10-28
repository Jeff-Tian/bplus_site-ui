(function(exports) {
    exports.MobileQACtrl = function($scope, $stateParams, $state, $rootScope) {


        $scope.css = {
            'loading': false,
            'start': false,
            'q1': false,
        };


        var setPage = function(page) {

            $scope.css.showPage = page;
        };

        $scope.setPage = setPage;
        var initpage = function() {
            setPage('loading');
            setTimeout(function() {
                setPage('start');
                $scope.$apply();
            }, 300);
        };


        initpage();


    };

    exports.MobileQACtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope'];
})(angular.bplus = angular.bplus || {});