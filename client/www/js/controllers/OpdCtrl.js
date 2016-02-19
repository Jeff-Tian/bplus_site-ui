(function (exports) {
    var STATIC_PARAMS = {
        SEARCH_TYPE: {
            POSITION: "poition",
            TRAINING: "training",
            COMPANY: "company",
        },
        RESOURCE_TYPE: {
            REGION: "region",
            // CHILD_REGION: "child_region",
            QUALIFICATIONS: "qualifications",
            JOB: "job",//TO MANY..
            WORKTYPE: "worktype",
            NATIRE_OF_FIRM: "natureoffirm",
            INDUSTRY: "industry"
        },
        MY_TYPE: {
            SUBSCRIPTION: "subscription",
        },
        SEARCH_KEYS: {
            WORKLOCATION: "workLocation",
            JOBTYPE: "jobType",
            SALARYFROM: "salaryFrom",
            SALARYTO: "salaryTo",
            EDUCATION: "education",
            INDUSTRY: "industry",
            NATUREOFFIRMS: "natureOfFirms",
            // jobFunction: "jobFunction"   //职能
        },
        SORT_KEYS: {
            DEFAULT: "match",
            MATCH: "match",
            COMPETIVE: "competive"
        },
        POSITION_SOURCE: {
            SEARCH: "search",
            HOT: "hot",
            RECOMMEND: "recommend"
        }
    };
    var REGION = [
        {text: "北京"},
        {text: "上海"},
        {text: "广州"},
        {text: "深圳"},
        {text: "南京"},
        {text: "杭州"},
        {text: "成都"},
        {text: "重庆"},
        {text: "苏州"},
        {text: "天津"},
        {text: "武汉"},
        {text: "西安"},
        {text: "大连"},
        {text: "郑州"},
        {text: "青岛"},
        {text: "福州"},
        {text: "沈阳"},
        {text: "合肥"},
        {text: "长沙"},
        {text: "昆明"},
        {text: "济南"},
        {text: "哈尔滨"},
        {text: "长春"}
    ];
    
    exports.OpdCtrl = function ($scope, $q, PipeCacheService, service)  {
        var hasMemberID = /mid=([^;]+)/.exec(document.cookie);
        var member_id = hasMemberID ? hasMemberID[1] : "";
        var getResourceParam = function(type, id) {
            var lng = angular.bplus.localeHelper.getLocale(window.location.pathname);
            var url = "/service-proxy";
            switch (type) {
                case STATIC_PARAMS.RESOURCE_TYPE.REGION:
                    url += "/bplus-resource-location"; 
                    break;
                case STATIC_PARAMS.RESOURCE_TYPE.CHILD_REGION:
                    url += "/bplus-resource-location/" + id; 
                    break;
                default:
                    url += "/bplus-resource/" + type + "/" + lng;
                    break;
            }
            return {url: url, params: {}};
        };
        var getMyParam = function(type) {
            var param = {
                url: "/service-proxy/bplus-opd/load/" + type + "/" + member_id,
                param: {}
            };
            return param;
        };
        var preloadResource = function(type, id) {
            var param = getResourceParam(type, id);
            return PipeCacheService.add(param);
        };
        var levelMapping = function(value) {
            var ret = 0;
            if (value < 20) {
                ret = 'e';
            } else if (value < 40) {
                ret = 'd';
            } else if (value < 60){
                ret = 'c';
            } else if (value < 80){
                ret = 'b';
            } else {
                ret = 'a';
            }
            return ret;
        };
        var salaryDisplay = function(salaryFrom, salaryTo) {
            salaryFrom = parseInt(salaryFrom);
            salaryTo = parseInt(salaryTo);
            if (isNaN(salaryFrom)) {
                salaryFrom = "";
            } else if (salaryFrom > 1000) {
                salaryFrom = salaryFrom / 1000 + 'k';
            }
            if (isNaN(salaryTo)) {
                salaryTo = "";
            } else if (salaryTo > 1000) {
                salaryTo = salaryTo / 1000 + 'k';
            }
            return salaryFrom + '-' + salaryTo;
        };
        $scope.getResource = function(type, id) {
            var param = getResourceParam(type, id);
            return PipeCacheService.get(param);
        };
        $scope.getRegionResource = function() {
            var deferred = $q.defer();
            deferred.resolve(REGION.slice(0));
            return deferred.promise;
        };
        $scope.getMy = function(type) {
            var param = getMyParam(type);
            return PipeCacheService.get(param);
        };
        // $scope.saveMy = function(type) {
        //     var param = getMyParam(type);
        //     return PipeCacheService.get(param);
        // };
        $scope.hasLoggedin = function() {
            return hasMemberID;
        };
        $scope.saveSubscription = function(paramStr) {
            return service
                .post('/service-proxy/bplus-opd/update/subscription', {
                    member_id: member_id,
                    criteria: paramStr
                });
        };

        //Page router related
        $scope.overallParams = {
            //for homepage
            searchKeyWord: "",
        };
        $scope.STATIC_PARAMS = STATIC_PARAMS;
        $scope.getPositions = function (keyword, tags, pageSize, page, searchTag, sortField) {
            var searchParam = {};
            tags = tags || {};
            keyword = keyword || "";
            searchParam[STATIC_PARAMS.SEARCH_KEYS.WORKLOCATION] = tags[STATIC_PARAMS.SEARCH_KEYS.WORKLOCATION] || "";
            searchParam[STATIC_PARAMS.SEARCH_KEYS.JOBTYPE] = tags[STATIC_PARAMS.SEARCH_KEYS.JOBTYPE] || "";
            searchParam[STATIC_PARAMS.SEARCH_KEYS.SALARYFROM] = tags[STATIC_PARAMS.SEARCH_KEYS.SALARYFROM] || "";
            searchParam[STATIC_PARAMS.SEARCH_KEYS.SALARYTO] = tags[STATIC_PARAMS.SEARCH_KEYS.SALARYTO] || "";
            searchParam[STATIC_PARAMS.SEARCH_KEYS.EDUCATION] = tags[STATIC_PARAMS.SEARCH_KEYS.EDUCATION] || "";
            searchParam[STATIC_PARAMS.SEARCH_KEYS.INDUSTRY] = tags[STATIC_PARAMS.SEARCH_KEYS.INDUSTRY] || "";
            searchParam[STATIC_PARAMS.SEARCH_KEYS.NATUREOFFIRMS] = tags[STATIC_PARAMS.SEARCH_KEYS.NATUREOFFIRMS] || "";
            searchParam.text = keyword;
            searchParam.member_id = member_id;
            searchParam.pageSize = pageSize;
            searchParam.page = page;
            searchParam.sortField = sortField || "";
            var url = "";
            switch (searchTag) {
                case STATIC_PARAMS.POSITION_SOURCE.SEARCH:
                    url ='/service-proxy/bplus-opd/jobsearch';
                    break;
                case STATIC_PARAMS.POSITION_SOURCE.HOT:
                    url ='/service-proxy/bplus-opd/hotjob';
                    break;
                case STATIC_PARAMS.POSITION_SOURCE.RECOMMEND:
                    url ='/service-proxy/bplus-opd/recommendjob';
                    break;
            }
            return service.post(url, searchParam).then(function(data) {
                var convertedJobData = data.jobs;
                if (data.jobs) {
                    convertedJobData = data.jobs.map(function(value){
                        return {
                            jobID: value.id,
                            matchLevel: (value.jobMatch.match ? levelMapping(value.jobMatch.match) : ""),
                            progressRate: (value.jobMatch.competitiveness ? value.competitiveness : ""),
                            position: {
                                name: value.title || "",
                                type: value.job_type || "",
                                salary: salaryDisplay(value.annual_salary_from, value.annual_salary_to),
                                certification: ""
                            },
                            issueTime: value.publish_at || "",
                            company: value.company.name,
                            status: "",
                            statusText: "",
                            companyinfo: {
                                logo: value.company.logo || "",
                                name: value.company.name,
                                field: value.company.industry,
                                flag: ""
                            }
                        }
                    });
                    data.jobs = convertedJobData;
                }
                return data;
            });
        };
        //Service related
        // var getCallFormat = {
        //     url: 'whatever',
        //     params: param
        // };
        // PipeCacheService.add(getCallFormat);
        // PipeCacheService.get(getCallFormat).then(function() {

        // });
            // matchLevel: "a",
            // progressRate: "50",
            // position: {
            //     name: "a",
            //     type: "b",
            //     salary: "1111",
            //     certification: "c",
            // },
            // issueTime: "2015-12-12",
            // company: "ksjksdf",
            // status: "finished",     //finished, delivered
            // statusText: "已有3家公司对你感兴趣!",
            // companyinfo: {
            //     logo: "img/opd/match_e.png",
            //     name: "阿里巴巴",
            //     field: "移动互联网/中企",
            //     flag: "latest"   //ad, recommendation, latest
            // }
        // $scope.positions = [{
        //     matchLevel: "a",
        //     progressRate: "50",
        //     postion: {
        //         name: "a",
        //         type: "b",
        //         salary: "1111",
        //         certification: "c",
        //     },
        //     issueTime: "2015",
        //     company: "ksjksdf"
        // },{
        //     matchLevel: "a",
        //     progressRate: "50",
        //     postion: {
        //         name: "a",
        //         type: "b",
        //         salary: "1111",
        //         certification: "c",
        //     },
        //     issueTime: "2015",
        //     company: "ksjksdf"
        // }]

        //Preload data
        Object.keys(STATIC_PARAMS.RESOURCE_TYPE).forEach(function(key) {
            if (key !== 'CHILD_REGION') {
                 preloadResource(STATIC_PARAMS.RESOURCE_TYPE[key]);
            }
        });
        if ($scope.hasLoggedin()) {
            // Object.keys(STATIC_PARAMS.MY_TYPE).forEach(function(key) {
            //     var value = STATIC_PARAMS.MY_TYPE[key];
            //     return PipeCacheService.add(getMyParam(value));
            // });
        }
        // Use static region now
        // $scope.getResource(STATIC_PARAMS.RESOURCE_TYPE.REGION).then(function(value) {
        //     value.forEach(function(value) {
        //         return preloadResource(STATIC_PARAMS.RESOURCE_TYPE.CHILD_REGION, value.code);
        //     });
        // });
    };

    exports.OpdCtrl.$inject = ['$scope', '$q', 'PipeCacheService', 'service', 'MessageStore', 'msgBus', '$translate', '$timeout', 'DeviceHelper', 'queryParser', 'WechatLogon', '$filter'];
})(angular.bplus = angular.bplus || {});