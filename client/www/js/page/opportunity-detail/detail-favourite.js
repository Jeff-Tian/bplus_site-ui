angular.module('opdModule').directive('bopdfavourite', function() {
        return {
            restrict: "E",
            scope: {
                src: '='
            },
            templateUrl: '/view-partial/opd/detail-favourite.html',
            link: function($scope, element, attrs) {
                $scope.data = {};
                $scope.data.positions = [{
                    matchLevel: "a",
                    progressRate: "50",
                    position: {
                        name: "a",
                        type: "b",
                        salary: "1111",
                        certification: "c",
                    },
                    issueTime: "2015",
                    company: "ksjksdf"
                },{
                    matchLevel: "a",
                    progressRate: "50",
                    position: {
                        name: "a",
                        type: "b",
                        salary: "1111",
                        certification: "c",
                    },
                    issueTime: "2015",
                    company: "ksjksdf"
                }]
                    }
                };  
    });