angular.module('bridgeplus.corp')
    .service('findService', ['$q', '$rootScope', 'service', 'DeviceHelper', function ($q, $rootScope, service, DeviceHelper) {
        var me = this;
        var corpPost = function(url, idParam){
            var param = $.extend(true, {
                member_id: DeviceHelper.getCookie('mid'),
                company_id: DeviceHelper.getCookie('corp_id')
            }, idParam);
            return service.post(url, param);
        };
        me.checkVIP = function(){
            var url = $rootScope.config.serviceUrls.corp.company.hasJobRecommend;
            return corpPost(url);
        };
        me.getSmart = function(param){
            var url = $rootScope.config.serviceUrls.corp.recommend.smart;
            return corpPost(url, param);
        };
        me.getWinner = function(param){
            var url = $rootScope.config.serviceUrls.corp.recommend.champion;
            return corpPost(url, param);
        };
        me.markCandidate = function(cv) {
            var url = $rootScope.config.serviceUrls.corp.recommend.markCandidate;
            return corpPost(url, param);
        };
    }])
;
