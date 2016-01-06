(function (exports) {
    var paymentDataStructure = {
        title: "",
        offerId: "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
        price: "0.00",
        details: [],
        forcusDetail: {
            detailUrl: "javascript: void(0);",
            description: ["复活赛门票"]
        },
        specialSign: "/bower_components/SHARED-UI/assistFiles/onlineStore/img/hot.png"
    };
    var paymentDataStructure1 = {
        title: "",
        offerId: "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
        price: "0.00",
        details: [],
        forcusDetail: {
            detailUrl: "javascript: void(0);",
            description: ["复活赛门票", "１对５小组点评"]
        },
        specialSign: ""
    };
    var paymentDataStructure2 = {
        title: "",
        offerId: "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
        price: "0.00",
        details: [],
        forcusDetail: {
            detailUrl: "javascript: void(0);",
            description: ["复活赛门票", "１对１专家点评"]
        },
        specialSign: ""
    };
    var paymentDataStructure3 = {
        title: "",
        offerId: "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
        price: "0.00",
        details: [],
        forcusDetail: {
            detailUrl: "javascript: void(0);",
            description: ["复活赛门票", "１对１专家点评"]
        },
        specialSign: ""
    };
    var paymentDataStructure4 = {
        title: "",
        offerId: "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
        price: "0.00",
        details: [],
        forcusDetail: {
            detailUrl: "javascript: void(0);",
            description: ["复活赛门票", "１对１专家点评"]
        },
        specialSign: ""
    };
    var paymentList = [paymentDataStructure, paymentDataStructure1, paymentDataStructure2, paymentDataStructure3, paymentDataStructure4];

    exports.onlineStoreParentCtrl = function ($scope, $state, service) {
        $scope.paymentList = paymentList;

        $scope.paymentList.map(function (o) {
            service.executePromiseAvoidDuplicate(o, 'fetching', function () {
                return service
                    .post(angular.onlineStore.config.serviceUrls.getOfferInfo, {offerId: o.offerId})
                    .then(function (result) {
                        if (result && result[0]) {
                            var data = result[0];

                            o.title = data.name;
                            o.price = data.price;
                            for (var i = 0; i < data.packages.length; i++) {
                                for (var j = 0; j < data.packages[i].products.length; j++) {
                                    var p = data.packages[i].products[j];
                                    o.details.push({
                                        description: p.name,
                                        icon: '/images/icons/product_type_' + p.productTypeId + '_red.png',
                                        mount: p.times
                                    });
                                }
                            }
                        }
                    })
            });
        });

        $scope.gotoConfirm = function (paymentDetails) {
            $state.go('confirm', {
                offerId: paymentDetails.offerId
            });
        };
    };

    exports.onlineStoreParentCtrl.$inject = ['$scope', '$state', 'service'];

})(angular.onlineStore = angular.onlineStore || {});