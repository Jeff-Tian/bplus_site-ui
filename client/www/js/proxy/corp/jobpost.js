angular.module('bridgeplus.corp')
    .service('jobpostService', ['$q', '$rootScope', 'service', function ($q, $rootScope, service) {
        var me = this;
        var resourceData = {};
        var resourceSet = {
            qualifications: "qualifications",
            worktype: "worktype",
            communityposition: "communityposition",
            language: "language",
            langguageproficiency: "langguageproficiency",
            englishlevel: "englishlevel",
            industry: "industry",
            salarytype: "salarytype",
            job: "job"
        };
        var RESOURCE_URL_PREFIX = "corp-service-proxy/resource/";

        me.init = function(){
            // Get resources
            var resourceKeys = Object.keys(resourceSet);
            var resourcePromises = resourceKeys.map(function(value){
                var url = RESOURCE_URL_PREFIX + value;
                return service.get(url);
            });
            return $q.all(resourcePromises).then(function(ret){
                resourceKeys.forEach(function(value, index){
                    resourceData[value] = ret[index];
                });
            });
        };
        me.RESOURCE_KEY = resourceSet;
        me.getResource = function(type){
            return resourceData[type];
        };
        me.postJob = function(param) {
            var url = $rootScope.config.serviceUrls.corp.job.publish;
            param = $.extend(true, {
company_id : "ed0842cf-c96b-46b5-b5c8-033c5ac3dbd5"
            }, param);
            return service.post(url, param);
        };
    }])
;