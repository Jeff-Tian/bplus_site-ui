(function (exports) {
    // var sid = /sid=([\d+])/.exec(location.search);
    // if (sid) {
    //     sid = sid[1];
    // } else {
    //     sid = 0;
    // }

    var paymentList = [{
        paymentMethod: "b_alipay",
        title: "",
        offerId: "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
        paymentURL: "/service-proxy/payment/create-order/national-upsell-2015-upsell-certification-english/by-b_alipy",
        price: 100,
        detail: [
            {
                description: "ticket",
                icon: "icon1a.png",
                mount: 1,
            },
            {
                description: "ticket",
                icon: "icon2b.png",
                mount: 1,
            },
            {
                description: "ticket",
                icon: "icon3b.png",
                mount: 1,
            }
        ],
        forcusDetail: {
            detailUrl: "",
            description: ""
        },
        specialSign: "hot"
    }];
    var moduleTrack = new window.ModuleTrack('onlineStore');

    exports.UpsellCtrl = function ($scope, service, queryParser) {
        var extraInfo = queryParser.parse(window.location.search);
        $scope.on("initOnlineStoreFromParent", function(event, param) {
            $scope.paymentDetail = param;
        })
        $scope.pay = function (target) {
            moduleTrack.send("pay.click", {option: $scope.paymentMethod});
            return service
                .post(target.paymentURL, {
                    payment: target.paymentMethod,
                    offerId: target.offerId,
                    extraInfo: JSON.stringify(extraInfo),
                    requestFrom: encodeURIComponent(window.location.href)
                })
                .then(function (result) {
                    window.location.href = '//' + angular.bplus.config.payment.host + ':' + angular.bplus.config.payment.port +
                        '/service/payment/' + target.paymentMethod + '/pay?orderId=' + result.orderId +
                        '&returnUrl=' + encodeURIComponent(location.protocol + "/" + location.host + "/paymentresult?isSuccess=true");
                })
                .catch(function (reason) {
                    if (reason) {
                        console.error(reason);
                        window.alert('创建订单失败!');
                    } else {
                        window.location.href = location.protocol + "/" + location.host + "/paymentresult?isSuccess=false";
                    }
                });
        };
    };
    exports.UpsellCtrl.$inject = ['$scope', 'service', 'queryParser'];
})(angular.bplus = angular.bplus || {});