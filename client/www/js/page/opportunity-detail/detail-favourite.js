angular.module('opdModule').directive('bopdfavourite', function() {
    return {
        restrict: "E",
        scope: {
            src: '='
        },
        templateUrl: '/view-partial/opd/detail-favourite.html',
        link: function($scope, element, attrs) {
            $scope.data = {};
            $scope.data.positions = {
                showPosition: true,
                data: [{
                    matchLevel: "a",
                    progressRate: "50",
                    position: {
                        name: "a",
                        type: "b",
                        salary: "1111",
                        certification: "c",
                    },
                    issueTime: "2015-12-12",
                    company: "ksjksdf",
                    status: "finisheda",
                    companyinfo: {
                        logo: "",
                        name: "",
                        field: "",
                        flag: ""
                    }
                },{
                    matchLevel: "d",
                    progressRate: "70",
                    position: {
                        name: "c",
                        type: "d",
                        salary: "111122",
                        certification: "d",
                    },
                    status: "delivered",
                    issueTime: "2015-12-20",
                    company: "ksj ksdf",
                    companyinfo: {
                        logo: "",
                        name: "",
                        field: "",
                        flag: ""
                    }
                }]
            };
        }
    };  
});