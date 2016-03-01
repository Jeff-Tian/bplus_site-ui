module.exports = {
    "logOnFromWechat": "/service-proxy/logon/from-wechat",
    "logOnByToken": "/service-proxy/logon/by-token",
    "checkNationalGame2015OrderPayment": "/service-proxy/payment/create-order/national-game-2015/check-has-right",
    "logOnAuthenticate": "/service-proxy/logon/authentication",
    "wechatJsApiConfig": "/service-proxy/wechat/js-api-config",
    "loadGameSeries": "/cmpt/game/series/load/:seriesId",
    "createOrderAndPayByWechat": "/service-proxy/payment/create-order/:option/by-wechat",
    "createOrderAndPayByAlipay": "/service-proxy/payment/create-order/:option/by-alipay",
    createUpsellOrderByAlipay: '/service-proxy/payment/create-upsell-order/by-b_alipay',
    "createOrderAndPayByRedemptionCode": "/service-proxy/payment/create-upsell-order/by-redemption-code",
    "createStoreOrderAndPayByRedemptionCode": "/service-proxy/payment/create-store-order/by-redemption-code",
    "getMyOrderList": "/service-proxy/commerce/get-my-order-list",
    getOrderDetail: '/service-proxy/commerce/get-order-detail/:orderId',
    getMyProductList: '/service-proxy/member/get-my-product-list',
    getUnusedProducts: '/service-proxy/member/get-my-unused-products',
    getUsedProducts: '/service-proxy/member/get-my-used-products',
    getOfferInfo: '/service-proxy/commerce/get-offer-info',

    studyCenter: {
        classBooking: {
            coming: '/service-proxy/study-center/class-booking/coming',
            unevaluated: '/service-proxy/study-center/class-booking/unevaluated',
            evaluated: '/service-proxy/study-center/class-booking/unevaluated'
        },
        my: {
            favorite: {
                teachers: '/service-proxy/study-center/my/favorite/teachers'
            }
        },
        teacher: {
            latestCourses: '/service-proxy/study-center/teacher/latest-courses/:teacherId'
        }
    }
};