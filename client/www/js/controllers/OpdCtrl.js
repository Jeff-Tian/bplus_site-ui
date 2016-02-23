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
        $scope.loadSubscription = function() {
            return service
                .post('/service-proxy/bplus-opd/subscription/load', {
                    member_id: member_id,
                });
        };
        $scope.saveSubscription = function(paramStr) {
            return service
                .post('/service-proxy/bplus-opd/subscription/save', {
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
        var dataDisplayMapping = function(dateString) {
            var targetDate = new Date(dateString);
            var ret = targetDate.getFullYear() + "年" + 
                    (targetDate.getMonth()+1) + "月" + 
                    targetDate.getDay()+"日"
            return ret;
        };
        var positionRetMapping = function (source) {
            var ret = {};
            ret = source.map(function(value){
                value.company = value.company || {};
                value.jobMatch = value.jobMatch || {};
                value.apply = value.apply || {};
                return {
                    jobID: value.id,
                    matchLevel: (value.jobMatch.match ? levelMapping(value.jobMatch.match) : ""),
                    progressRate: (value.jobMatch.competitiveness ? value.jobMatch.competitiveness : ""),
                    position: {
                        name: value.title || "",
                        type: value.job_type || "",
                        salary: salaryDisplay(value.annual_salary_from, value.annual_salary_to),
                        certification: value.education || "学历不限"
                    },
                    issueTime: value.publish_at || "",
                    appiedTime: value.apply.apply_date ? dataDisplayMapping(value.apply.apply_date) + "投递" : "",
                    company: value.company.name,
                    status: value.apply.status || "",
                    statusText: "",
                    companyinfo: {
                        id: value.company.id || "",
                        logo: value.company.logo || "",
                        name: value.company.name,
                        field: value.company.industry || "",
                        flag: ""
                    }
                }
            });
            return ret;
        };
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
                    convertedJobData = positionRetMapping(data.jobs);
                    data.jobs = convertedJobData;
                }
                return data;
            });
        };
        $scope.getFavoritePositions = function(){
            var url = "/service-proxy/bplus-opd/favoritejob/load";
            var param = {
                member_id: member_id
            };
            return service.post(url, param).then(function(data) {
                var convertedJobData = data.jobs;
                if (data.jobs) {
                    convertedJobData = positionRetMapping(data.jobs);
                    data.jobs = convertedJobData;
                }
                if (data.company) {
                    data.company.forEach(function(value){
                        value.match = (value.match ? levelMapping(value.match) : "");
                    });
                }
                return data;
            });
        };
        $scope.removeFavoritePosition = function(jobid, isJob){
            var url = "/service-proxy/bplus-opd/favoritejob/remove";
            var param = {
                member_id: member_id,
                item_id: jobid,
                category: isJob ? "job" : "company"
            }
            return service.post(url, param);
        };
        $scope.saveFavoritePosition = function(jobid, isJob){
            var url = "/service-proxy/bplus-opd/favoritejob/save";
            var param = {
                member_id: member_id,
                item_id: jobid,
                category: isJob ? "job" : "company"
            }
            return service.post(url, param);
        };
        $scope.getDeliveredPositions = function(){
            var url = "/service-proxy/bplus-opd/deliveredjob/load";
            var param = {
                member_id: member_id
            }
            return service.post(url, param).then(function(data) {
                var convertedJobData = data;
                if (data) {
                    convertedJobData = positionRetMapping(data);
                    data = convertedJobData;
                }
                return data;
            });
        };
        $scope.removeDeliveredPosition = function(jobid) {
            var url = "/service-proxy/bplus-opd/deliveredjob/remove";
            var param = {
                member_id: member_id,
                item_id: jobid,
                category: "company"
            }
            return service.post(url, param);
        };
        //Preload data
        Object.keys(STATIC_PARAMS.RESOURCE_TYPE).forEach(function(key) {
            if (key !== 'CHILD_REGION') {
                 preloadResource(STATIC_PARAMS.RESOURCE_TYPE[key]);
            }
        });
        // if ($scope.hasLoggedin()) {
            // Object.keys(STATIC_PARAMS.MY_TYPE).forEach(function(key) {
            //     var value = STATIC_PARAMS.MY_TYPE[key];
            //     return PipeCacheService.add(getMyParam(value));
            // });
        // }
        // Use static region now
        // $scope.getResource(STATIC_PARAMS.RESOURCE_TYPE.REGION).then(function(value) {
        //     value.forEach(function(value) {
        //         return preloadResource(STATIC_PARAMS.RESOURCE_TYPE.CHILD_REGION, value.code);
        //     });
        // });
    };

    exports.OpdCtrl.$inject = ['$scope', '$q', 'PipeCacheService', 'service', 'MessageStore', 'msgBus', '$translate', '$timeout', 'DeviceHelper', 'queryParser', 'WechatLogon', '$filter'];
})(angular.bplus = angular.bplus || {});