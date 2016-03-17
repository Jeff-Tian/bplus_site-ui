angular.module('bridgeplus.corp')
    .service('cvService', ['$q', 'service', function ($q, service) {
        var me = this;
        var resourceData = {};
        var resourceSet = [
            "qualifications"
        ];
        var PARAM_MAPPING = {
            'delivered': "todo",
            'interested': "unlocked",
            'deleted': "dropped"
        };
        var JOB_URL_PREFIX = "corp-service-proxy/jobapply/";
        var RESOURCE_URL_PREFIX = "corp-service-proxy/resource/";

        me.getCV = function(currentTab, option){
            var url = JOB_URL_PREFIX + PARAM_MAPPING[currentTab];
            var param = $.extend(true, {
company_id : "ed0842cf-c96b-46b5-b5c8-033c5ac3dbd5"
            }, option);
            return service.post(url, param).then(function(value){
                return value;
            });
        };
        me.getQulificationsByID = function(id) {
            var key = "qualifications";
            var data = resourceData[key];
            // Array.prototype.find
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === id){
                    return data[i].text;
                }
            }
            return "";
        };
        me.levelMapping = function(value) {
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
        me.unlockCV = function(cv){
            var url = '/corp-service-proxy/jobapply/unlockCandidate';
            var param = {
                applierList: [cv]
            };
            return service.post(url, parma);
        };
        me.restoreCV = function(cv){
            var url = '/corp-service-proxy/jobapply/restoreCandidate';
            var param = {
                applierList: [cv]
            };
            return service.post(url, param);
        };
        me.dropCV = function(cvArray){
            var url = '/corp-service-proxy/jobapply/dropCandidate';
            var param = {
                applierList: cvArray
            };
            return service.post(url, param);
        };
        me.getResume = function(idParam){
            var url = '/corp-service-proxy/candidate/resume';
            var param = $.extend(true, {
company_id : "ed0842cf-c96b-46b5-b5c8-033c5ac3dbd5"
            }, idParam);
            return service.post(url, param);
        }
        me.init = function() {
            // Get resources
            var resourcePromises = resourceSet.map(function(value){
                var url = RESOURCE_URL_PREFIX + value;
                return service.get(url);
            });
            return $q.all(resourcePromises).then(function(ret){
                resourceSet.forEach(function(value, index){
                    resourceData[value] = ret[index];
                });
            });
        };
    }]);
;