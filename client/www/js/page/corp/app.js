angular.module('corpModule', ['bplusModule', 'widgetModule', 'bplusConfigModule', 'bridgeplus.corp'])
    .value('corpModuleEvents', {
        corpInfo: {
            loaded: 'corpInfo:loaded'
        }
    })
    .run(['$rootScope', 'service', 'DeviceHelper', 'corpModuleEvents', 'msgBus', function ($rootScope, service, DeviceHelper, corpModuleEvents, msgBus) {
        $rootScope.corpSignOut = function () {
            service.delete($rootScope.config.serviceUrls.corp.member.signOut)
                .finally(function (res) {
                    window.location.href = '/';
                });
        };

        var corp_id = DeviceHelper.getCookie('corp_id');
        if (corp_id) {
            $rootScope.loadingData = false;
            service.executePromiseAvoidDuplicate($rootScope, 'loadingData', function () {
                return service.get($rootScope.config.serviceUrls.corp.member.basicInfo, {
                    params: {
                        company_id: corp_id
                    }
                });
            }).then(function (result) {
                $rootScope.corpBasicInfo = {
                    companyName: result.name,
                    city: result.location,
                    license: {name: result.business_license_url},
                    licenseInfo: result.business_license_url ? result.business_license_url : undefined,
                    contact: result.contact,
                    position: result.contact_position,
                    email: result.contact_mail,
                    mobile: result.contact_mobile,
                    auditStatus: result.register_status
                };

                msgBus.emitMsg(corpModuleEvents.corpInfo.loaded, $rootScope.corpBasicInfo);

                if ($rootScope.corpBasicInfo.auditStatus !== 'passed' && window.location.pathname !== '/register') {
                    // window.location = '/register?company_id=' + corp_id;
                }
            });
        }
    }])
;