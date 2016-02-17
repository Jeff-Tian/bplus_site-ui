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
        $scope.search = function (keyword, tags) {

        };
        //Service related
        // var getCallFormat = {
        //     url: 'whatever',
        //     params: param
        // };
        // PipeCacheService.add(getCallFormat);
        // PipeCacheService.get(getCallFormat).then(function() {

        // });
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