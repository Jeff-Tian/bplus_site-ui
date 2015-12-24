module.exports = {
    "logOnFromWechat": "/service-proxy/logon/from-wechat",
    "logOnByToken": "/service-proxy/logon/by-token",
    "checkNationalGame2015OrderPayment": "/service-proxy/payment/create-order/national-game-2015/check-has-right",
    "logOnAuthenticate": "/service-proxy/logon/authentication",
    "wechatJsApiConfig": "/service-proxy/wechat/js-api-config",
    "loadGameSeries": "/cmpt/game/series/load/:seriesId",
    "createOrderAndPayByWechat": "/service-proxy/payment/create-order/:option/by-wechat",
    "createOrderAndPayByAlipay": "/service-proxy/payment/create-order/:option/by-alipay",
    "createOrderAndPayByRedemptionCode": "/service-proxy/payment/create-upsell-order/by-redemption-code",
    "getMyOrderList": "/service-proxy/commerce/get-my-order-list",
    getOrderDetail: '/service-proxy/commerce/get-order-detail/:orderId'
};