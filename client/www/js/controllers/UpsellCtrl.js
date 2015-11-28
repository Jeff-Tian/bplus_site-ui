(function (exports) {
    var PAYMENT_OPTIONS = {
        "wechat": "wechat",
        "alipay": "alipay"
    };
    var OPTIONS = {
        "upsellA1": {
            "name": "planA",
            "paymentInfo": "upsell-certification-chinese",
            "offerId": "dcb33391-baad-4dd0-9c05-aa2e4f05c940",
            "certification": 1,
            "certificationType": "1",
            "report": 0,
            "comment": 0,
            "price": "50.00"
        },
        "upsellA2": {
            "name": "planA",
            "paymentInfo": "upsell-certification-english",
            "offerId": "17fd9576-c9f6-47dc-809e-6ce04114ba40",
            "certification": 1,
            "certificationType": "2",
            "report": 0,
            "comment": 0,
            "price": "200.00"
        },
        "upsellB": {
            "name": "planB",
            "paymentInfo": "upsell-report",
            "offerId": "074df389-5d30-4829-824b-34ce227547a0",
            "certification": 1,
            "certificationType": "1",
            "report": 1,
            "comment": 0,
            "price": "80.00"
        },
        "upsellC": {
            "name": "planC",
            "paymentInfo": "upsell-comments",
            "offerId": "469b300a-c5de-4be1-b1c3-59cd2a5219c6",
            "certification": 1,
            "certificationType": "1",
            "report": 1,
            "comment": 1,
            "price": "150.00"
        }
    };
    var PAYMENT_BASIC_URL = "service-proxy/payment/create-order/national-upsell-2015-";
    var getOrderUrl = function (option, paymentMethod) {
        return PAYMENT_BASIC_URL + option + "/by-" + paymentMethod;
    };

    var sid = /sid=([\d+])/.exec(location.search);
    if (sid) {
        sid = sid[1];
    } else {
        sid = 0;
    }
    exports.UpsellCtrl = function ($scope, service) {
        var paymentTarget = OPTIONS["upsellA1"];
        $scope.detail = paymentTarget;
        $scope.itemA = {
            price: OPTIONS["upsellA1"].price
        };
        $scope.itemB = {
            price: OPTIONS["upsellB"].price
        };
        $scope.itemC = {
            price: OPTIONS["upsellC"].price
        };
        $scope.itemAOption = "1";
        $scope.displayDetail = false;
        $scope.itemASelect = function (option) {
            $scope.itemAOption = option;
            $scope.itemA.price = OPTIONS["upsellA" + option].price;
        };
        $scope.mouseleave = function () {
            $(".b-upsell-detail").css('visibility', 'hidden');
        };
        $scope.select = function (option) {
            if (option === "upsellA") {
                option += $scope.itemAOption;
                // option = $scope.itemAOptionOne ? "upsellA1" : "upsellA2" ;
            }
            $(".b-upsell-detail").css('visibility', 'visible');
            paymentTarget = OPTIONS[option];
            $scope.detail = paymentTarget;
        };
        $scope.pay = function () {
            var paymentMethod = "alipay";

            if ($scope.paymentMethod) {
                paymentMethod = PAYMENT_OPTIONS[$scope.paymentMethod];
            }
            if (paymentTarget) {
                return service
                    .post(getOrderUrl(paymentTarget.paymentInfo, paymentMethod), {
                        payment: paymentMethod,
                        offerId: paymentTarget.offerId,
                        extInfo: "sid=" + sid,
                        requestFrom: encodeURIComponent(window.location.href)
                    })
                    .then(function (result) {
                        window.location.href = '//' + angular.bplus.config.payment.host + ':' + angular.bplus.config.payment.port +
                            '/service/payment/' + paymentMethod + '/pay?orderId=' + result.orderId +
                            '&returnUrl=' + encodeURIComponent(location.protocol + "\\\\" + location.host + "\\paymentresult?isSuccess=true");
                    })
                    .catch(function () {
                        window.location.href = location.protocol + "\\\\" + location.host + "\\paymentresult?isSuccess=false";
                    });
            }
        };
    };
    exports.UpsellCtrl.$inject = ['$scope', 'service'];
})(angular.bplus = angular.bplus || {});