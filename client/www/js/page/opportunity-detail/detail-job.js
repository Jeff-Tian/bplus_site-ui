angular.module('opdModule')
    .directive('bopdjob', ['$rootScope', function ($rootScope) {
        return {
            restrict: "E",
            scope: true,
            templateUrl: '/view-partial/opd/detail-job.html',
            link: function ($scope, element, attrs) {
                //Init the page
                $scope.getResource($scope.STATIC_PARAMS.RESOURCE_TYPE.REGION).then(function(value) {
                    debugger;
                });
                //Search bar
                var keyWordFromHomePage = $scope.overallParams.searchKeyWord;
                $scope.searchOptions = {
                    placeholder: "请输入职位名称或公司名称",
                    searchContent: keyWordFromHomePage,
                    search: function(keyword) {
                        console.log("detail-job, search", keyword);
                        //Do search
                        //Show result
                    }
                };
                //search(keyWordFromHomePage);
                $scope.overallParams.searchKeyWord = "";
                //Search content
                $scope.searchList = {
                    NUMBER_PER_PAGE: 10,
                    showPosition: true,
                    showPageMenu: true,
                    showPageMore: false,
                    page: "empty",//data, logout, empty
                    data: [{
                        matchLevel: "a",
                        progressRate: "50",
                        position: {
                            id: "abcdefg",
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
                            id: "higklmn",
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
                $scope.searchList.page = login ? ($scope.searchList.data.length > 0 ? "data" : "empty") : "logout";
                // $scope.data.positions.page = "empty";
                var originObject = $scope.searchList.data[0];
                for (var i = 0; i < 302; i++) {
                    $scope.searchList.data.push($.extend(true, {}, originObject, {progressRate: i.toString()}));
                }
                //////
                var morePlaces = [{
                    key: 'huabei',
                    label: '华北地区：',
                    list: [{
                        id: 1,
                        text: '北京'
                    }, {
                        id: 17,
                        text: '天津'
                    }, {
                        id: 18,
                        text: '河北'
                    }, {
                        id: 19,
                        text: '山西'
                    }, {
                        id: 20,
                        text: '内蒙古'
                    }]
                }, {
                    key: 'dongbei',
                    label: '东北地区：',
                    list: [{
                        id: 21,
                        text: '辽宁'
                    }, {
                        id: 22,
                        text: '吉林'
                    }, {
                        id: 23,
                        text: '黑龙江'
                    }, {
                        id: 24,
                        text: '大连'
                    }]
                }, {
                    key: 'huadong',
                    label: '华东地区：',
                    list: [{
                        id: 2,
                        text: '上海'
                    }, {
                        id: 26,
                        text: '江苏'
                    }, {
                        id: 27,
                        text: '浙江'
                    }, {
                        id: 28,
                        text: '安徽'
                    }, {
                        id: 29,
                        text: '福建'
                    }, {
                        id: 30,
                        text: '江西'
                    }, {
                        id: 31,
                        text: '山东'
                    }, {
                        id: 32,
                        text: '宁波'
                    }, {
                        id: 33,
                        text: '厦门'
                    }, {
                        id: 34,
                        text: '青岛'
                    }]
                }, {
                    key: 'zhongnan',
                    label: '中南地区：',
                    list: [{
                        id: 35,
                        text: '河南'
                    }, {
                        id: 36,
                        text: '湖北'
                    }, {
                        id: 37,
                        text: '湖南'
                    }, {
                        id: 38,
                        text: '广东'
                    }, {
                        id: 39,
                        text: '广西'
                    }, {
                        id: 40,
                        text: '海南'
                    }, {
                        id: 3,
                        text: '深圳'
                    }]
                }, {
                    key: 'xinan',
                    label: '西南地区：',
                    list: [{
                        id: 42,
                        text: '重庆'
                    }, {
                        id: 43,
                        text: '四川'
                    }, {
                        id: 44,
                        text: '贵州'
                    }, {
                        id: 45,
                        text: '云南'
                    }, {
                        id: 46,
                        text: '西藏'
                    }]
                }, {
                    key: 'xibei',
                    label: '西北地区：',
                    list: [{
                        id: 47,
                        text: '陕西'
                    }, {
                        id: 48,
                        text: '甘肃'
                    }, {
                        id: 49,
                        text: '青海'
                    }, {
                        id: 50,
                        text: '宁夏'
                    }, {
                        id: 51,
                        text: '新疆'
                    }]
                }];

                var moreIndustries = [{
                    id: 888,
                    value: '制造',
                    data: '制造',
                    text: '制造'
                }, {
                    id: 889,
                    value: '营造',
                    data: '营造',
                    text: '营造'
                }, {
                    id: 890,
                    value: '批发',
                    data: '批发',
                    text: '批发'
                }, {
                    id: 891,
                    value: '零售',
                    data: '零售',
                    text: '零售'
                }, {
                    id: 892,
                    value: '运输',
                    data: '运输',
                    text: '运输'
                }, {
                    id: 893,
                    value: '仓储',
                    data: '仓储',
                    text: '仓储'
                }, {
                    id: 894,
                    value: '餐饮',
                    data: '餐饮',
                    text: '餐饮'
                }, {
                    id: 895,
                    value: '通信传播',
                    data: '通信传播',
                    text: '通信传播'
                }, {
                    id: 896,
                    value: '保险业',
                    data: '保险业',
                    text: '保险业'
                }, {
                    id: 897,
                    value: '不动产',
                    data: '不动产',
                    text: '不动产'
                }, {
                    id: 898,
                    value: '科学',
                    data: '科学',
                    text: '科学'
                }, {
                    id: 899,
                    value: '技术服务',
                    data: '技术服务',
                    text: '技术服务'
                }, {
                    id: 900,
                    value: '公共行政',
                    data: '公共行政',
                    text: '公共行政'
                }, {
                    id: 901,
                    value: '医疗保健',
                    data: '医疗保健',
                    text: '医疗保健'
                }, {
                    id: 902,
                    value: '社会工作',
                    data: '社会工作',
                    text: '社会工作'
                }, {
                    id: 903,
                    value: '艺术',
                    data: '艺术',
                    text: '艺术'
                }];

                $scope.filters = [{
                    key: 'workPlace',
                    label: '工作地点：',
                    more: morePlaces,
                    list: [{
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
                    }]
                }, {
                    key: 'diplomas',
                    label: '学历要求：',
                    list: [{
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
                    }]
                }, {
                    key: 'industry',
                    label: '行业领域：',
                    extraListValue: '',
                    autoComplete: moreIndustries,
                    list: [{
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
                    }]
                }, {
                    key: 'companyType',
                    label: '公司性质：',
                    list: [{
                        id: 0,
                        text: '不限'
                    }, {
                        id: 1,
                        text: '国企'
                    }, {
                        id: 2,
                        text: '外企'
                    }]
                }, {
                    key: 'functionality',
                    label: '职\u2001\u2001能：',
                    thumbLabel: '职能：',
                    list: [{
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
                    }]
                }];

                var f = {};
                for (var i = 0; i < $scope.filters.length; i++) {
                    f[$scope.filters[i].key] = $scope.filters[i];
                }

                $scope.filterSetting = {
                    findKey: function(scope, target) {
                        var result = scope.list.find(function(value){
                            return  (target === value.text);
                        });
                        return result;
                    },
                    autoCompleteConfirm: function(filterSetting, scope, target) {
                        if (target && target !== "") {
                            filterSetting[scope.key] = target;
                            scope.type = "";
                        }
                    },
                    showThumb: true,
                    showDetail: true,
                    hasThumbView: true,
                    workPlace: f.workPlace.list[0],
                    diplomas: f.diplomas.list[4],
                    industry: f.industry.list[3],
                    companyType: f.companyType.list[1],
                    functionality: f.functionality.list[9]
                };

                $scope.sortingAndFilter = [{
                    key: 'sorting',
                    label: '排序方式：',
                    list: [{
                        id: 0,
                        text: '默认'
                    }, {
                        id: 1,
                        text: '匹配度'
                    }, {
                        id: 2,
                        text: '竞争力'
                    }, {
                        id: 3,
                        text: '热门'
                    }, {
                        id: 4,
                        text: '最新'
                    }]
                }, {
                    key: 'monthlySalary',
                    label: '月薪：',
                    type: 'dropdown',
                    list: [{
                        id: '0',
                        text: '不限'
                    }, {
                        id: '1',
                        text: '20k-25k'
                    }, {
                        id: '2',
                        text: '25k-50k'
                    }]
                }, {
                    key: 'jobCategory',
                    label: '工作性质：',
                    list: [{
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
                    }]
                }];

                $scope.sortingAndFilterSetting = {
                    showThumb: false,
                    showDetail: true,
                    hasThumbView: false,
                    inline: true,
                    sorting: {
                        id: 0,
                        text: '默认'
                    },
                    monthlySalary: {
                        id: '2',
                        text: '25k-50k'
                    },
                    jobCategory: {
                        id: 0,
                        text: '不限'
                    }
                };

                
            }
        };
    }])
;