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
                showPageMenu: true,
                showPageMore: false,
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
                    status: "finished",     //finished, delivered
                    companyinfo: {
                        logo: "img/opd/match_e.png",
                        name: "阿里巴巴",
                        field: "移动互联网/中企",
                        flag: "ad"   //ad, recommendation, latest
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
                    status: "",
                    issueTime: "2015-12-20",
                    company: "ksj ksdf",
                    companyinfo: {
                        logo: "img/opd/match_e.png",
                        name: "阿里巴巴",
                        field: "移动互联网/中企",
                        flag: "recommendation"
                    }
                }]
            };
            var originObject = $scope.data.positions.data[0];
            for (var i = 0; i < 103; i++) {
                $scope.data.positions.data.push($.extend(true, {}, originObject, {progressRate: i}));
            };
        }
    };  
});