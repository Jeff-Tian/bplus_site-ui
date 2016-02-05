(function (exports) {
    var STATIC_PARAMS = {
        SEARCH_TYPE: {
            POSITION: "poition",
            TRAINING: "training",
            COMPANY: "company",
        },
        RESOURCE_TYPE: {
            REGION: "region",
            CHILD_REGION: "child_region",
            INDUSTRY: "industry",
            qualifications: "qualifications",
            job: "job",//TO MANY..
            worktype: "worktype",
            industry: "industry"
        }
    };
    exports.OpdCtrl = function ($scope, $q, PipeCacheService)  {
        //Page router related
        $scope.overallParams = {
            //for homepage
            searchKeyWord: "",
        };
        $scope.STATIC_PARAMS = STATIC_PARAMS;
        $scope.search = function() {

        };
        $scope.search = function() {

        };
        $scope.getResource = function(type, id) {
            var deferred = $q.defer();
            var lng = angular.bplus.localeHelper.getLocale(window.location.pathname);
            var url = "";
            switch (type) {
                case STATIC_PARAMS.RESOURCE_TYPE.REGION:
                    url = "/bplus-resource-location"; 
                    break;
                case STATIC_PARAMS.RESOURCE_TYPE.CHILD_REGION:
                    url = "/bplus-resource-location/" + id; 
                    break;
                default:
                    url = "/bplus-resource/" + type + "/" + lng;
                    break;
            }
            return {url: url, params: {}};
            return deferred.promise;
        };
        var url = "service-proxy/bplus-resource-location";
        //Service need to be cached
        var serviceList = [{
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }]

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
    };

    exports.OpdCtrl.$inject = ['$scope', '$q', 'PipeCacheService', 'service', 'MessageStore', 'msgBus', '$translate', '$timeout', 'DeviceHelper', 'queryParser', 'WechatLogon', '$filter'];
})(angular.bplus = angular.bplus || {});