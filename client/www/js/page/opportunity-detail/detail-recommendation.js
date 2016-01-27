angular.module('opdModule').directive('bopdrecommendation', function () {
    return {
        restrict: "E",
        scope: {
            src: '='
        },
        templateUrl: '/view-partial/opd/detail-recommendation.html',
        link: function ($scope, element, attrs) {
            //Data for positions
            //Other names can also be used
            $scope.data = {};
            $scope.data.positions = {
                NUMBER_PER_PAGE: 3,
                showPosition: false,
                showPageMenu: true,
                showPageMore: false,
                data: [{
                    matchLevel: "a",
                    progressRate: "50",
                    position: {
                        name: "产品经理",
                        type: "兼职",
                        salary: "9k-16k",
                        certification: "学历不限",
                    },
                    issueTime: "2015-12-12",
                    company: "苹果",
                    status: "finished",     //finished, delivered
                    statusText: "",
                    companyinfo: {
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
                    statusText: "已有7家公司对你感兴趣!",
                    issueTime: "2015-12-20",
                    company: "ksj ksdf",
                    companyinfo: {
                    }
                }]
            };
            var originObject = $scope.data.positions.data[0];
            for (var i = 0; i < 3; i++) {
                $scope.data.positions.data.push($.extend(true, {}, originObject, {progressRate: i}));
            };
            ///
            $scope.filters = {
                workPlace: 0,
                diplomas: 0,
                industry: 0,
                companyType: 0,
                functionality: 0,
                jobCategory: 0,
                monthlySalaryLowerBound: null,
                monthlySalaryUpperBound: null,
                positions: []
            };

            $scope.workPlaces = [{
                id: 0,
                text: '全国'
            }, {
                id: 1,
                text: '北京'
            }, {
                id: 2,
                text: '上海'
            }, {
                id: 3,
                text: '深圳'
            }, {
                id: 4,
                text: '广州'
            }, {
                id: 5,
                text: '杭州'
            }, {
                id: 6,
                text: '成都'
            }, {
                id: 7,
                text: '南京'
            }, {
                id: 8,
                text: '武汉'
            }, {
                id: 9,
                text: '西安'
            }, {
                id: 10,
                text: '厦门'
            }, {
                id: 11,
                text: '长沙'
            }, {
                id: 12,
                text: '贵州'
            }, {
                id: 13,
                text: '苏州'
            }, {
                id: 14,
                text: '昆山'
            }, {
                id: 15,
                text: '常州'
            }];

            $scope.filteredWorkPlaces = $scope.workPlaces.slice(0, 10);

            $scope.diplomas = [{
                id: 0,
                text: '不限'
            }, {
                id: 1,
                text: '本科'
            }, {
                id: 2,
                text: '大专'
            }, {
                id: 3,
                text: '硕士'
            }, {
                id: 4,
                text: '博士'
            }];

            $scope.industries = [{
                id: 0,
                text: '不限'
            }, {
                id: 1,
                text: '移动互联网'
            }, {
                id: 2,
                text: '电子商务'
            }, {
                id: 3,
                text: '金融'
            }, {
                id: 4,
                text: '企业服务'
            }, {
                id: 5,
                text: '教育'
            }, {
                id: 6,
                text: '文化'
            }, {
                id: 7,
                text: '娱乐'
            }, {
                id: 8,
                text: '游戏'
            }];

            $scope.filteredIndustries = $scope.industries.slice(0, 9);

            $scope.companyTypes = [{
                id: 0,
                text: '不限'
            }, {
                id: 1,
                text: '国企'
            }, {
                id: 2,
                text: '外企'
            }];

            $scope.functions = [{
                id: 0,
                text: '不限'
            }, {
                id: 1,
                text: '市场'
            }, {
                id: 2,
                text: '销售'
            }, {
                id: 3,
                text: '公关'
            }, {
                id: 4,
                text: '技术'
            }, {
                id: 5,
                text: '设计'
            }, {
                id: 6,
                text: '人事'
            }, {
                id: 7,
                text: '仓管'
            }, {
                id: 8,
                text: '行政'
            }, {
                id: 9,
                text: '文书'
            }];

            $scope.jobCategory = [{
                id: 0,
                text: '不限'
            }, {
                id: 1,
                text: '实习'
            }, {
                id: 2,
                text: '兼职'
            }, {
                id: 3,
                text: '全职'
            }];

            $scope.filterables = [{
                key: 'workPlace',
                label: '工作地点：',
                list: $scope.workPlaces,
                less: $scope.filteredWorkPlaces
            }, {
                key: 'diplomas',
                label: '学历要求：',
                list: $scope.diplomas,
                less: $scope.diplomas
            }, {
                key: 'industry',
                label: '行业领域：',
                list: $scope.industries,
                less: $scope.filteredIndustries
            }, {
                key: 'companyType',
                label: '公司性质：',
                list: $scope.companyTypes,
                less: $scope.companyTypes
            }, {
                key: 'functionality',
                label: '职\u2001\u2001能：',
                list: $scope.functions,
                less: $scope.functions
            }, {
                key: 'jobCategory',
                label: '工作性质：',
                list: $scope.jobCategory,
                less: $scope.jobCategory
            }];
        }
    };
});