(function (exports) {
    exports.OpdCtrl = function ($scope, PipeCacheService)  {
        //Page router related
        $scope.overallParams = {
            //for homepage
            searchKeyWord: "",
            //
        };
        //Service need to be cached
        var serviceList = [{
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }, {
            url: "",
            params: ""
        }]

        //Service related
        // var getCallFormat = {
        //     url: 'whatever',
        //     params: param
        // };
        // PipeCacheService.add(getCallFormat);
        // PipeCacheService.get(getCallFormat).then(function() {

        // });
        // $scope.positions = [{
        //     matchLevel: "a",
        //     progressRate: "50",
        //     postion: {
        //         name: "a",
        //         type: "b",
        //         salary: "1111",
        //         certification: "c",
        //     },
        //     issueTime: "2015",
        //     company: "ksjksdf"
        // },{
        //     matchLevel: "a",
        //     progressRate: "50",
        //     postion: {
        //         name: "a",
        //         type: "b",
        //         salary: "1111",
        //         certification: "c",
        //     },
        //     issueTime: "2015",
        //     company: "ksjksdf"
        // }]
    };

    exports.OpdCtrl.$inject = ['$scope', 'PipeCacheService', 'service', 'MessageStore', 'msgBus', '$translate', '$timeout', 'DeviceHelper', 'queryParser', 'WechatLogon', '$filter'];
})(angular.bplus = angular.bplus || {});