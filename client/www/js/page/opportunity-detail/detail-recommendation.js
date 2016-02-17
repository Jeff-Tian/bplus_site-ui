angular.module('opdModule').directive('bopdrecommendation', ['$q', function ($q) {
    return {
        restrict: "E",
        scope: true,
        templateUrl: '/view-partial/opd/detail-recommendation.html',
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
                    showThumb: false,
                    showDetail: true,
                    hasThumbView: false,
                    workPlace: f.workPlace.list[0],
                    diplomas: f.diplomas.list[0],
                    industry: f.industry.list[0],
                    companyType: f.companyType.list[0],
                    jobCategory: f.jobCategory.list[0],
                    monthlySalary: f.monthlySalary.list[0]
                };
            });
            
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
                    companyinfo: {}
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
                    statusText: "已有7家公司对你感兴趣!",
                    issueTime: "2015-12-20",
                    company: "ksj ksdf",
                    companyinfo: {}
                }]
            };
            var originObject = $scope.data.positions.data[0];
            for (var i = 0; i < 3; i++) {
                $scope.data.positions.data.push($.extend(true, {}, originObject, {progressRate: i}));
            }
        }
    };
}]);