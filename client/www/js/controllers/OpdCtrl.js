(function (exports) {
    var STATIC_PARAMS = {
        SEARCH_TYPE: {
            POSITION: "poition",
            TRAINING: "training",
            COMPANY: "company",
        },
        RESOURCE_TYPE: {
            REGION: "region",
            CHILD_REGION: "child_region",
            INDUSTRY: "industry",
            qualifications: "qualifications",
            job: "job",//TO MANY..
            worktype: "worktype",
            industry: "industry"
        }
    };
    exports.OpdCtrl = function ($scope, $q, PipeCacheService)  {
        var getResourceParam = function(type, id) {
            var lng = angular.bplus.localeHelper.getLocale(window.location.pathname);
            var url = "/service-proxy";
            switch (type) {
                case STATIC_PARAMS.RESOURCE_TYPE.REGION:
                    url += "/bplus-resource-location"; 
                    break;
                case STATIC_PARAMS.RESOURCE_TYPE.CHILD_REGION:
                    url += "/bplus-resource-location/" + id; 
                    break;
                default:
                    url += "/bplus-resource/" + type + "/" + lng;
                    break;
            }
            return {url: url, params: {}};
        };
        //Page router related
        $scope.overallParams = {
            //for homepage
            searchKeyWord: "",
        };
        $scope.STATIC_PARAMS = STATIC_PARAMS;
        $scope.search = function () {

        };
        $scope.search = function () {

        };
        $scope.preloadResource = function(type, id) {
            var param = getResourceParam(type, id);
            return PipeCacheService.add(param);
        };
        $scope.getResource = function(type, id) {
            var param = getResourceParam(type, id);
            return PipeCacheService.get(param).then(function(result) {
                if (result.status === 200 && result.statusText === "OK") {
                    return ;
                }
            });
        };
        var url = "service-proxy/bplus-resource-location";
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
        }];

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

        $scope.menus = [{
            text: '机会首页',
            href: '#/home',
            icon: 'home',
            states: ['home']
        }, {
            text: '工作实习',
            href: '#/job',
            icon: 'suitcase',
            states: ['job', 'job/detail']
        }, {
            text: '收藏夹',
            href: '#/favorite',
            icon: '',
            states: ['favorite'],
            image: 'icon/opd/fav.png',
            activeImage: 'icon/opd/fav_white.png'
        }, {
            text: '推荐职位',
            href: '#/recommended-positions',
            icon: '',
            states: ['recommended-positions'],
            image: 'icon/opd/recommendation.png',
            activeImage: 'icon/opd/recommendation_white.png',
            badge: '3'
        }, {
            text: '已投递的职位',
            href: '#/applied-positions',
            icon: '',
            states: ['applied-positions'],
            image: 'icon/opd/delivered.png',
            activeImage: 'icon/opd/delivered_white.png'
        }, {
            text: '培训机会',
            href: '#/training',
            icon: '',
            states: ['training'],
            image: 'icon/opd/opp.png',
            activeImage: 'icon/opd/opp_white.png'
        }];
    };

    exports.OpdCtrl.$inject = ['$scope', '$q', 'PipeCacheService', 'service', 'MessageStore', 'msgBus', '$translate', '$timeout', 'DeviceHelper', 'queryParser', 'WechatLogon', '$filter'];
})(angular.bplus = angular.bplus || {});