angular.module('corpModule', ['bplusModule', 'widgetModule', 'bplusConfigModule', 'bridgeplus.corp'])
    .run(['$rootScope', 'service', function ($rootScope, service) {
        $rootScope.corpSignOut = function () {
            service.delete($rootScope.config.serviceUrls.corp.member.signOut)
                .finally(function (res) {
                    window.location.href = '/';
                });
        };
    }])
;