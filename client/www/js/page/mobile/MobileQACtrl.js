(function(exports) {
    exports.MobileQACtrl = function($scope, $stateParams, $state, $rootScope) {


        $scope.css = {
            'loading': false,
            'start': false,
            'question': false,
        };
        var currentPage = 1;

        var answerList = ['A', 'A', 'A', 'D', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'C', 'B', 'A', 'A', 'C', 'B', 'B', 'D', 'B'];


        /*data*/
        $scope.questions = [{
            q_id: 1,
            q_content: 'MobilePreheatingQ1',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ1A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ1B'
            }],
            rightAnswer: 'AA',
            result: 'MobilePreheatingQ1R',
            reasons: [{
                'reason': 'MobilePreheatingQ1R1'
            }]
        }, {
            q_id: 2,
            q_content: 'MobilePreheatingQ2',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ2A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ2B'
            }],
            rightAnswer: 'AA',
            result: 'MobilePreheatingQ2R',
            reasons: [{
                'reason': 'MobilePreheatingQ2R1'
            }]
        }, {
            q_id: 3,
            q_content: 'MobilePreheatingQ3',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ3A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ3B'
            }, {
                'select': 'C',
                'content': 'MobilePreheatingQ3C'
            }],
            rightAnswer: 'AA',
            result: 'MobilePreheatingQ3R',
            reasons: [{
                'reason': 'MobilePreheatingQ3R1'
            }]
        }, {
            q_id: 4,
            q_content: 'MobilePreheatingQ4',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ4A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ4B'
            }, {
                'select': 'C',
                'content': 'MobilePreheatingQ4C'
            }, {
                'select': 'D',
                'content': 'MobilePreheatingQ4D'
            }],
            rightAnswer: 'AD',
            result: 'MobilePreheatingQ4R',
            reasons: [{
                'reason': 'MobilePreheatingQ4R1'
            }]
        }, {
            q_id: 5,
            q_content: 'MobilePreheatingQ5',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ5A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ5B'
            }],
            rightAnswer: 'AA',
            result: 'MobilePreheatingQ5R',
            reasons: [{
                'reason': 'MobilePreheatingQ5R1'
            }]
        }, {
            q_id: 6,
            q_content: 'MobilePreheatingQ6',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ6A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ6B'
            }, {
                'select': 'C',
                'content': 'MobilePreheatingQ6C'
            }, {
                'select': 'D',
                'content': 'MobilePreheatingQ6D'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ6R',
            reasons: [{
                'reason': 'MobilePreheatingQ6R1'
            }]
        }, {
            q_id: 7,
            q_content: 'MobilePreheatingQ7',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ7A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ7B'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ7R',
            reasons: [{
                'reason': 'MobilePreheatingQ7R1'
            }]
        }, {
            q_id: 8,
            q_content: 'MobilePreheatingQ8',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ8A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ8B'
            }, {
                'select': 'C',
                'content': 'MobilePreheatingQ8C'
            }, {
                'select': 'D',
                'content': 'MobilePreheatingQ8D'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ8R',
            reasons: [{
                'reason': 'MobilePreheatingQ8R1'
            }]
        }, {
            q_id: 9,
            q_content: 'MobilePreheatingQ9',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ9A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ9B'
            }, {
                'select': 'C',
                'content': 'MobilePreheatingQ9C'
            }, {
                'select': 'D',
                'content': 'MobilePreheatingQ9D'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ9R',
            reasons: [{
                'reason': 'MobilePreheatingQ9R1'
            }, {
                'reason': 'MobilePreheatingQ9R2'
            }, {
                'reason': 'MobilePreheatingQ9R3'
            }]
        }, {
            q_id: 10,
            q_content: 'MobilePreheatingQ10',
            items: [{
                'select': 'A',
                'content': '可以'
            }, {
                'select': 'B',
                'content': '不可以'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ10R',
            reasons: [{
                'reason': 'MobilePreheatingQ10R1'
            }]
        }, {
            q_id: 11,
            q_content: 'MobilePreheatingQ11',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ11A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ11B'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ11R',
            reasons: [{
                'reason': 'MobilePreheatingQ11R1'
            }, {
                'reason': 'MobilePreheatingQ11R2'
            }, {
                'reason': 'MobilePreheatingQ11R3'
            }]
        }, {
            q_id: 12,
            q_content: 'MobilePreheatingQ12',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ12A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ12B'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ12R',
            reasons: [{
                'reason': 'MobilePreheatingQ12R1'
            }, {
                'reason': 'MobilePreheatingQ12R2'
            }]
        }, {
            q_id: 13,
            q_content: 'MobilePreheatingQ13',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ13A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ13B'
            }, {
                'select': 'C',
                'content': 'MobilePreheatingQ13C'
            }, {
                'select': 'D',
                'content': 'MobilePreheatingQ13D'
            }],
            rightAnswer: 'AC',
            result: 'MobilePreheatingQ13R',
            reasons: [{
                'reason': 'MobilePreheatingQ13R1'
            }]
        }, {
            q_id: 14,
            q_content: 'MobilePreheatingQ14',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ14A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ14B'
            }, {
                'select': 'C',
                'content': 'MobilePreheatingQ14C'
            }, {
                'select': 'D',
                'content': 'MobilePreheatingQ14D'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ14R',
            reasons: [{
                'reason': 'MobilePreheatingQ14R1'
            }, {
                'reason': 'MobilePreheatingQ14R2'
            }]
        }, {
            q_id: 15,
            q_content: 'MobilePreheatingQ15',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ15A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ15B'
            }],
            rightAnswer: 'AA',
            result: 'MobilePreheatingQ15R',
            reasons: [{
                'reason': 'MobilePreheatingQ15R1'
            }, {
                'reason': 'MobilePreheatingQ15R2'
            }]
        }, {
            q_id: 16,
            q_content: 'MobilePreheatingQ16',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ16A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ16B'
            }],
            rightAnswer: 'AA',
            result: 'MobilePreheatingQ16R',
            reasons: [{
                'reason': 'MobilePreheatingQ16R1'
            }, {
                'reason': 'MobilePreheatingQ16R2'
            }]
        }, {
            q_id: 17,
            q_content: 'MobilePreheatingQ17',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ17A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ17B'
            }, {
                'select': 'C',
                'content': 'MobilePreheatingQ17C'
            }],
            rightAnswer: 'AC',
            result: 'MobilePreheatingQ17R',
            reasons: [{
                'reason': 'MobilePreheatingQ17R1'
            }, {
                'reason': 'MobilePreheatingQ17R2'
            }, {
                'reason': 'MobilePreheatingQ17R3'
            }]
        }, {
            q_id: 18,
            q_content: 'MobilePreheatingQ18',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ18A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ18B'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ18R',
            reasons: [{
                'reason': 'MobilePreheatingQ18R1'
            }]
        }, {
            q_id: 19,
            q_content: 'MobilePreheatingQ19',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ19A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ19B'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ19R',
            reasons: [{
                'reason': 'MobilePreheatingQ19R1'
            }]
        }, {
            q_id: 20,
            q_content: 'MobilePreheatingQ20',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ20A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ20B'
            }, {
                'select': 'C',
                'content': 'MobilePreheatingQ20C'
            }, {
                'select': 'D',
                'content': 'MobilePreheatingQ20D'
            }],
            rightAnswer: 'AD',
            result: 'MobilePreheatingQ20R',
            reasons: [{
                'reason': 'MobilePreheatingQ20R1'
            }, {
                'reason': 'MobilePreheatingQ20R2'
            }]
        }, {
            q_id: 21,
            q_content: 'MobilePreheatingQ21',
            items: [{
                'select': 'A',
                'content': 'MobilePreheatingQ21A'
            }, {
                'select': 'B',
                'content': 'MobilePreheatingQ21B'
            }],
            rightAnswer: 'AB',
            result: 'MobilePreheatingQ21R',
            reasons: [{
                'reason': 'MobilePreheatingQ21R1'
            }]
        }];
        /*data*/


        var setPage = function(page) {

            if (page !== "question") {
                $scope.css.showPage = page;
            } else {
                if (currentPage === 22) {
                    currentPage = 1;
                    $scope.css.showPage = 'end';
                } else {
                    $scope.css.showPage = currentPage;
                }
            }
            $scope.q_answer = '';
            $scope.q_answer_result = '';
            var value = currentPage / 21 * 100;
            $('.progress').progress({
                'value': value
            });
        };

        $scope.setPage = setPage;
        var initpage = function() {
            setPage('loading');
            setTimeout(function() {
                setPage('start');
                $scope.$apply();
            }, 3000);
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
            }, 1000);
        };



        initpage();


    };

    exports.MobileQACtrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope'];
})(angular.bplus = angular.bplus || {});