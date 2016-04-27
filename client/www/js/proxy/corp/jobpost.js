angular.module('bridgeplus.corp')
    .service('jobpostService', ['$q', '$rootScope', 'service', 'DeviceHelper', function ($q, $rootScope, service, DeviceHelper) {
        var me = this;
        var corpPost = function(url, idParam){
            var param = $.extend(true, {
                member_id: DeviceHelper.getCookie('mid'),
                company_id: DeviceHelper.getCookie('corp_id')
            }, idParam);
            return service.post(url, param);
        };
        me.postJob = function(param) {
            var url = $rootScope.config.serviceUrls.corp.job.publish;
            return corpPost(url, param);
        };
    }])
;