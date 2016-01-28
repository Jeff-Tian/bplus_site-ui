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
                name: "永苑艺术培训中心",
                description: "全清华北大名师",
                rate: 3,
                read: 190,
                field: "创意与设计领域",
                labels: [
                    "创意",
                    "思维",
                    "人文",
                    "创作"
                ],
                details: [{
                    pic: "/img/opd/ad.jpg",
                    title: "商业海报设计基础班 / 免费"
                }, {
                    pic: "/img/opd/ad.jpg",
                    title: "商业海报设计基础班 / $99.99"
                }],
                isRecommended: true,
                isAD: false,
            }, {
                name: "永苑艺术培训中心",
                description: "全清华北大名师",
                rate: 3,
                read: 190,
                field: "创意与设计领域",
                labels: [
                    "创意",
                    "思维",
                    "人文",
                    "创作"
                ],
                details: [{
                    pic: "/img/opd/ad.jpg",
                    title: "商业海报设计基础班 / 免费"
                }, {
                    pic: "/img/opd/ad.jpg",
                    title: "商业海报设计基础班 / $99.99"
                }, {
                    pic: "/img/opd/ad.jpg",
                    title: "设计基础班 / $39.99"
                }],
                isRecommended: false,
                isAD: true,
            }]
        }
        var originObject1 = $scope.trainingOpportunityList.data[0];
        for (var i = 0; i < 13; i++) {
            $scope.trainingOpportunityList.data.push($.extend(true, {}, originObject1));
        }
    }]);