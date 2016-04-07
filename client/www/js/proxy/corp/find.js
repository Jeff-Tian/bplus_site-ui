angular.module('bridgeplus.corp')
    .service('findService', ['$q', '$rootScope', 'service', 'DeviceHelper', function ($q, $rootScope, service, DeviceHelper) {
        var me = this;
        me.getSmart = function(){
            var url = $rootScope.config.serviceUrls.corp.recommend.smart;
            var param = {
                company_id: DeviceHelper.getCookie('corp_id')
            };
param.company_id = "ed0842cf-c96b-46b5-b5c8-033c5ac3dbd5"
            return service.post(url, param);
        };
        me.getWinner = function(){
            var url = $rootScope.config.serviceUrls.corp.recommend.champion;
            var param = {
                company_id: DeviceHelper.getCookie('corp_id')
            };
param.company_id = "ed0842cf-c96b-46b5-b5c8-033c5ac3dbd5"
            return service.post(url, param);
        };
    }])
;
