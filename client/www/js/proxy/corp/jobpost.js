angular.module('bridgeplus.corp')
    .service('jobpostService', ['$q', '$rootScope', 'service', 'DeviceHelper', function ($q, $rootScope, service, DeviceHelper) {
        var me = this;
        me.postJob = function(param) {
            var url = $rootScope.config.serviceUrls.corp.job.publish;
            param = $.extend(true, {
                company_id : DeviceHelper.getCookie("corp_id")
            }, param);
            return service.post(url, param);
        };
    }])
;