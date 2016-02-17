angular.module('opdModule')
    .directive('bopdjob', ['$rootScope', '$q', function ($rootScope, $q) {
        return {
            restrict: "E",
            scope: true,
            templateUrl: '/view-partial/opd/detail-job.html',
            link: function ($scope, element, attrs) {
                //Init the page
                var data = {
                };
                var dataPromises = Object.keys($scope.STATIC_PARAMS.RESOURCE_TYPE).map(function(key) {
                    var value = $scope.STATIC_PARAMS.RESOURCE_TYPE[key];
                    var promise;
                    if (value !== $scope.STATIC_PARAMS.RESOURCE_TYPE.REGION) {
                        promise = $scope.getResource(value);
                    } else {
                        promise = $scope.getRegionResource();
                    }
                    return promise.then(function(ret) {
                        data[value] = ret.map(function(rawData, index) {
                            return {
                                id: rawData.id || index + 1,
                                value: rawData.text || "",
                                data: rawData.text || "",
                                text: rawData.text || ""
                            };
                        });
                        return ret;
                    });
                });
                $q.all(dataPromises).then(function() {
                    var DISPLAY_COUNT = 7;
                    //Search conditions
                    var placesRaw = data[$scope.STATIC_PARAMS.RESOURCE_TYPE.REGION];
                    var industriesRaw = data[$scope.STATIC_PARAMS.RESOURCE_TYPE.INDUSTRY];
                    $scope.filters = [{
                        key: 'workPlace',
                        label: '工作地点：',
                        more: placesRaw.slice(DISPLAY_COUNT),
                        list: [{
                            id: 0,
                            value: '全国',
                            data: '全国',
                            text: '全国'
                        }].concat(placesRaw.slice(0, DISPLAY_COUNT))
                    }, {
                        key: 'diplomas',
                        label: '学历要求：',
                        list: [{
                            id: 0,
                            text: '不限'
                        }].concat(data[$scope.STATIC_PARAMS.RESOURCE_TYPE.QUALIFICATIONS])
                    }, {
                        key: 'industry',
                        label: '行业领域：',
                        extraListValue: '',
                        autoComplete: industriesRaw,
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
                            value: '不限',
                            data: '全国',
                            text: '全国'
                        }].concat(data[$scope.STATIC_PARAMS.RESOURCE_TYPE.NATIRE_OF_FIRM])
                    }, {
                      key: 'jobCategory',
                      label: '工作性质：',
                      list: [{
                        id: 0,
                        text: '不限'
                      }].concat(data[$scope.STATIC_PARAMS.RESOURCE_TYPE.WORKTYPE])
                    }, {
                        key: 'monthlySalary',
                        label: '月薪：',
                        rangeLabel: '人民币',
                        type: 'range',
                        list: [{
                            id: '0',
                            text: '不限'
                        }],
                        range: {
                            from: "",
                            to: "",
                            change: function(thisscope) {
                                var fromValue = thisscope.range.from === undefined ? "" : thisscope.range.from;
                                var toValue = thisscope.range.to === undefined ? "" : thisscope.range.to;
                                if (fromValue === "" && toValue === "") {
                                    $scope.filterSetting.monthlySalary = thisscope.list[0];
                                } else if (fromValue !=="" && toValue !== "") {
                                    var valueA = parseInt(fromValue);
                                    var valueB = parseInt(toValue);
                                    if (valueA > valueB) {
                                        var tmpValue = valueA;
                                        valueA = valueB;
                                        valueB = tmpValue;
                                    }
                                    $scope.filterSetting.monthlySalary = valueA + " ~ " + valueB;
                                } else {
                                    $scope.filterSetting.monthlySalary = fromValue + " ~ " + toValue;
                                }
                            }
                        }
                    }];
                    var f = {};
                    for (i = 0; i < $scope.filters.length; i++) {
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
                        diplomas: f.diplomas.list[0],
                        industry: f.industry.list[0],
                        companyType: f.companyType.list[0],
                        jobCategory: f.jobCategory.list[0],
                        monthlySalary: f.monthlySalary.list[0]
                    };
                });
                //Search filter
                $scope.sortingAndFilter = [{
                    key: 'sorting',
                    label: '排序方式：',
                    list: [{
                        id: 1,
                        text: '匹配度'
                    }, {
                        id: 2,
                        text: '竞争力'
                    }, {
                        id: 3,
                        text: '最新'
                    }]
                }];

                $scope.sortingAndFilterSetting = {
                    showThumb: false,
                    showDetail: true,
                    hasThumbView: false,
                    inline: true,
                    sorting: {
                        id: 1,
                        text: '匹配度'
                    },
                    sortingClick: function(key, l) {
                        if ($scope.sortingAndFilterSetting[key].id !== l.id) {
                            $scope.sortingAndFilterSetting[key] = l;
                            console.log("search", l.text);
                            //search();
                        }
                    }
                };
                //Search bar
                var keyWordFromHomePage = $scope.overallParams.searchKeyWord;
                $scope.searchOptions = {
                    placeholder: "请输入职位名称或公司名称",
                    searchContent: keyWordFromHomePage,
                    search: function(keyword){
                        //TODO
                        var tags = {};
                        $scope.search(keyword, tags);
                    }
                };

                //TODO search(keyWordFromHomePage).then(function(data) {
                    $scope.overallParams.searchKeyWord = "";
                    //Search content

                // });
                //Search config and search results
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
                //TODO check login status(cookie, mid);
                var login = true;
                $scope.searchList.page = login ? ($scope.searchList.data.length > 0 ? "data" : "empty") : "logout";
                // $scope.data.positions.page = "empty";
                var originObject = $scope.searchList.data[0];
                for (var i = 0; i < 302; i++) {
                    $scope.searchList.data.push($.extend(true, {}, originObject, {progressRate: i.toString()}));
                }
                //////////////////////////
                

            }
        };
    }])
;