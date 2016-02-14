angular.module('opdModule').directive('bopdfavourite', function () {
    return {
        restrict: "E",
        scope: {
            src: '='
        },
        templateUrl: '/view-partial/opd/detail-favourite.html',
        link: function ($scope, element, attrs) {
            $scope.data = {};
            $scope.data.positions = {
                NUMBER_PER_PAGE: 10,
                showPosition: true,
                showPageMenu: true,
                showPageMore: false,
                page: "empty",//data, logout, empty
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
                    statusText: "已有3家公司对你感兴趣!",
                    companyinfo: {
                        logo: "img/opd/match_e.png",
                        name: "阿里巴巴",
                        field: "移动互联网/中企",
                        flag: "latest"   //ad, recommendation, latest
                    }
                }, {
                    matchLevel: "d",
                    progressRate: "70",
                    position: {
                        name: "c",
                        type: "d",
                        salary: "111122",
                        certification: "d",
                    },
                    status: "",
                    statusText: "已有3家公司对你感兴趣!",
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
            var login = true;
            $scope.data.positions.page = login ? ($scope.data.positions.data.length > 0 ? "data" : "empty") : "logout";
            // $scope.data.positions.page = "empty";
            var originObject = $scope.data.positions.data[0];
            for (var i = 0; i < 300; i++) {
                $scope.data.positions.data.push($.extend(true, {}, originObject, {company:"a"+i, progressRate: i}));
            }



            $scope.data.companies = {
                NUMBER_PER_PAGE: 10,
                data: [{
                    matchLevel: "a",
                    companyinfo: {
                        logo: "img/opd/match_e.png",
                        name: "阿里巴巴",
                        field: "移动互联网/中企",
                        flag: "latest"   //ad, recommendation, latest
                    },
                    positioninfo: {
                        onboard: 100,
                        newposition: 2,
                        issueTime: "2015-12-20",
                    }
                }, {
                    matchLevel: "d",
                    companyinfo: {
                        logo: "img/opd/match_e.png",
                        name: "阿里巴巴",
                        field: "移动互联网/中企",
                        flag: "recommendation"
                    },
                    positioninfo: {
                        onboard: 14,
                        newposition: 0,
                        issueTime: "2015-12-22",
                    }
                }]
            };

            // $scope.data.positions.page = "empty";
            originObject = $scope.data.companies.data[0];

            for (i = 0; i < 3; i++) {
                $scope.data.companies.data.push($.extend(true, {}, originObject));
            }
            ///////////////////////////////////////
            $(".b-opd-favorite .menu .item").tab();
        }
    };
});