(function (exports) {
    var paymentDataStructure = {
        paymentMethod: "b_alipay",
        title: "",
        offerId: "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
        paymentURL: "/service-proxy/payment/create-order/national-upsell-2015-upsell-certification-english/by-b_alipay",
        price: "100.00",
        details: [
            {
                description: "ticket",
                icon: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/icon1a.png",
                mount: 1,
            },
            {
                description: "1v5",
                icon: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/icon2b.png",
                mount: 0,
            },
            {
                description: "1v1",
                icon: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/icon3b.png",
                mount: 1,
            }
        ],
        forcusDetail: {
            detailUrl: "www.baidu.com",
            description: ["复活赛门票"]
        },
        specialSign: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/hot.png"
    };
    var paymentDataStructure1 = {
        paymentMethod: "b_alipay",
        title: "",
        offerId: "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
        paymentURL: "/service-proxy/payment/create-order/national-upsell-2015-upsell-certification-english/by-b_alipay",
        price: "100.00",
        details: [
            {
                description: "ticket",
                icon: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/icon1a.png",
                mount: 0,
            },
            {
                description: "1v5",
                icon: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/icon2b.png",
                mount: 1,
            },
            {
                description: "1v1",
                icon: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/icon3b.png",
                mount: 1,
            }
        ],
        forcusDetail: {
            detailUrl: "",
            description: ["复活赛门票", "１对５小组点评"]
        },
        specialSign: ""
    };
    var paymentDataStructure2 = {
        paymentMethod: "b_alipay",
        title: "",
        offerId: "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
        paymentURL: "/service-proxy/payment/create-order/national-upsell-2015-upsell-certification-english/by-b_alipay",
        price: "100.00",
        details: [
            {
                description: "ticket",
                icon: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/icon1a.png",
                mount: 1,
            },
            {
                description: "1v5",
                icon: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/icon2b.png",
                mount: 1,
            },
            {
                description: "1v1",
                icon: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/icon3b.png",
                mount: 1,
            }
        ],
        forcusDetail: {
            detailUrl: "",
            description: ["复活赛门票", "１对１专家点评"]
        },
        specialSign: ""
    };
    var paymentList = [paymentDataStructure, paymentDataStructure1, paymentDataStructure2];

    exports.onlineStoreParentCtrl = function ($scope) {
        $scope.paymentList = paymentList;
    };

    exports.onlineStoreParentCtrl.$inject = ['$scope'];

})(angular.onlineStore = angular.onlineStore || {});