(function (exports) {
    var PAYMENT_OPTIONS = {
        "wechat": "wechat",
        "alipay": "alipay"
    };
    var OPTIONS = {
        "upsellA": {
            "name": "planA",
            "paymentInfo": "upsell-basic"
        },
        "upsellB": {
            "name": "planB",
            "paymentInfo": "upsell-medium"
        },
        "upsellC": {
            "name": "planC",
            "paymentInfo": "upsell-advanced"
        }
    };
    var PAYMENT_BASIC_URL = "/payment/create-order/national-game-2015-";
    var getOrderUrl = function(option, paymentMethod) {
        return PAYMENT_BASIC_URL + option + "/by-" + paymentMethod;
    };

    exports.UpsellCtrl = function($scope, service) {
        $scope.selectAndPay = function() {
            var target = null;
            var paymentMethod = "alipay";
            if ($scope.productID) {
                target = OPTIONS[$scope.productID];
            }
            if ($scope.paymentMethod) {
                paymentMethod  = PAYMENT_OPTIONS[$scope.paymentMethod];
            }
            if (target) {
                return service
                    .post(getOrderUrl(target.paymentInfo, paymentMethod), {
                        payment: paymentMethod,
                        requestFrom: encodeURIComponent(window.location.href)
                    })
                    .then(function (result) {
                        window.location.href = '//' + angular.bplus.config.payment.host + ':' + angular.bplus.config.payment.port + '/service/payment/' + paymentMethod + '/pay?orderId=' + result.orderId + '&returnUrl=' + encodeURIComponent(window.location.href + '/' + paymentResult + '/' + $scope.offerData.kind);
                    }
            }
        }
    }
    exports.UpsellCtrl.$inject = ['$scope', 'service'];
})(angular.bplus = angular.bplus || {});