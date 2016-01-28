angular
    .module('opdModule')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('job/detail', {
            url: '/job/:jobid',
            templateUrl: 'job-detail.html',
            controller: 'detailJobDetail'
        });
    }])
    .directive('bopdjobdetail', function () {
        return {
            templateUrl: '/view-partial/opd/detail-job-detail.html',
            link: function (scope, element, attrs) {
                scope.$element = angular.element(element);
            }
        };
    })
    .controller('detailJobDetail', ['$scope', function ($scope) {

        $scope.competitiveness = 80;

        $scope.chartPentagon = '4-2-3-2-2';

        /////
        $scope.similarJobList = {
            NUMBER_PER_PAGE: 4,
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
                statusText: "已有3家公司对你感兴趣!",
                companyinfo: {
                    logo: "img/opd/match_e.png",
                    name: "阿里巴巴",
                    field: "移动互联网/中企",
                    flag: "ad"   //ad, recommendation
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
        var originObject = $scope.similarJobList.data[0];
        for (var i = 0; i < 13; i++) {
            $scope.similarJobList.data.push($.extend(true, {}, originObject, {progressRate: i}));
        }
        /////

        $scope.trainingOpportunityList = {
            NUMBER_PER_PAGE: 4,
            data: [{

            }, {

            }]
        }

        // [{
        //     read: 190
        // }, {
        //     read: 192
        // }]
        // ;

    }]);