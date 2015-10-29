(function(exports) {
    exports.MobileQACtrl = function($scope, $stateParams, $state, $rootScope) {


        $scope.css = {
            'loading': false,
            'start': false,
            'question': false,
        };
        var currentPage = 1;

        var answerList = ['A', 'B', 'C', 'D'];

        var setPage = function(page) {

            if (page !== "question") {
                $scope.css.showPage = page;
            } else {
                $scope.css.showPage = 'question' + currentPage;
            }
            $scope.q_answer = '';
            $scope.q_answer_result = '';
        };

        $scope.setPage = setPage;
        var initpage = function() {
            setPage('loading');
            setTimeout(function() {
                setPage('start');
                $scope.$apply();
            }, 300);
        };

        $scope.nextPage = function(index) {
            currentPage = index + 1;

            var id = '.ui.dimmer.q' + index;
            $(id).dimmer('hide');
            setPage('question');
        };
        $scope.answer = function(index, select) {
            if (answerList[index - 1] === select) {
                $scope.q_answer_result = 'right';
            } else {
                $scope.q_answer_result = 'wrong';
            }
            $scope.q_answer = select;
            var id = '.ui.dimmer.q' + index;

            setTimeout(function() {
                $(id).dimmer('show');
            }, 3000);
        };



        initpage();


    };

    exports.MobileQACtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope'];
})(angular.bplus = angular.bplus || {});