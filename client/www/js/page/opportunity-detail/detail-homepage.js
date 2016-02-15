angular.module('opdModule').directive('bopdhomepage', function() {
    return {
        restrict: "E",
        scope: true,
        templateUrl: '/view-partial/opd/detail-homepage.html',
        link: function($scope, element, attrs) {
            //Search bar
            $scope.overallParams.searchKeyWord = "";
            $scope.searchOptions = {
                placeholder: "请输入职位名称或公司名称",
                candidate: {
                    title: "热门搜索",
                    keywords: [
                        "管理培训生",
                        "产品经理",
                        "运营",
                        "前端工程师",
                        "销售",
                        "行政",
                        "市场",
                        "财务"
                    ]
                },
                searchContent: "",
                search: function(keyword) {
                   $scope.overallParams.searchKeyWord = keyword;
                   location.hash = "job";
                }
            };
            //Position
            //Position-Recommendation
            $scope.recommendation = {};
            $scope.recommendation.positions = {
                NUMBER_PER_PAGE: 5,
                showPosition: true,
                showPageMenu: false,
                showPageMore: true,
                pageMoreHash: "/recommended-positions",
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
            $scope.recommendation.positions.page = login ? ($scope.recommendation.positions.data.length > 0 ? "data" : "empty") : "logout";
            // $scope.data.positions.page = "empty";
            var originObject = $scope.recommendation.positions.data[0];
            for (var i = 0; i < 3; i++) {
                $scope.recommendation.positions.data.push($.extend(true, {}, originObject, {progressRate: i}));
            }
            //Position-Hot
            $scope.hot = {};
            $scope.hot.positions = {
                NUMBER_PER_PAGE: 5,
                showPosition: true,
                showPageMenu: false,
                showPageMore: true,
                pageMoreHash: "/job",
                page: "empty",//data, logout, empty
                data: [{
                    matchLevel: "a",
                    progressRate: "70",
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
                    progressRate: "50",
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
            login = true;
            $scope.hot.positions.page = login ? ($scope.hot.positions.data.length > 0 ? "data" : "empty") : "logout";
            // $scope.data.positions.page = "empty";
            originObject = $scope.hot.positions.data[0];
            for (i = 0; i < 3; i++) {
                $scope.hot.positions.data.push($.extend(true, {}, originObject, {progressRate: i}));
            }
            //Training
            $scope.trainingOpportunityList = {
                NUMBER_PER_PAGE: 3,
                showPageMenu: false,
                showPageMore: true,
                pageMoreHash: "/training",
                data: [{
                    name: "永苑艺术培训中心",
                    pic: "/img/opd/ad.jpg",
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
                    pic: "/img/opd/ad.jpg",
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
            };

            var originObject1 = $scope.trainingOpportunityList.data[0];
            for (i = 0; i < 13; i++) {
                $scope.trainingOpportunityList.data.push($.extend(true, {}, originObject1));
            }
            // $scope.trainingOpportunityList.data = [];
            //Semantic UI
            $(".b-opd-homepage .menu .item").tab();
        }
    };
});