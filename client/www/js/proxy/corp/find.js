angular.module('bridgeplus.corp')
    .service('findService', ['$q', '$rootScope', 'service', 'DeviceHelper', function ($q, $rootScope, service, DeviceHelper) {
        var me = this;
        me.getSmart = function(){
            var url = $rootScope.config.serviceUrls.corp.recommend.smart;
            var param = {
                company_id: DeviceHelper.getCookie('corp_id')
            };
            return service.post(url, param);
        };
        me.getWinner = function(){
            var url = $rootScope.config.serviceUrls.corp.recommend.champion;
            var param = {
                company_id: DeviceHelper.getCookie('corp_id')
            };
            return service.post(url, param);
        };
        me.markCandidate = function(cv) {
            var url = $rootScope.config.serviceUrls.corp.recommend.markCandidate;
            var param = {
                applierList: [cv]
            };
            return service.post(url, param);
        };
    }])
;
