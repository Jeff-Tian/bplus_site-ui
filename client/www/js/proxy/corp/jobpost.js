angular.module('bridgeplus.corp')
    .service('jobpostService', ['$q', '$rootScope', 'service', 'DeviceHelper', function ($q, $rootScope, service, DeviceHelper) {
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
        me.getResourceByID = function (key, id) {
            var data = resourceData[key];
            // Array.prototype.find
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    return data[i].text;
                }
            }
            return "";
        };
        me.postJob = function(param) {
            var url = $rootScope.config.serviceUrls.corp.job.publish;
            param = $.extend(true, {
                company_id : DeviceHelper.getCookie("corp_id")
            }, param);
            return service.post(url, param);
        };
    }])
;