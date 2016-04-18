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
            evaluated: '/service-proxy/study-center/class-booking/evaluated'
        },
        my: {
            favorite: {
                teachers: '/service-proxy/study-center/my/favorite/teachers'
            }
        },
        teacher: {
            latestCourses: '/service-proxy/study-center/teacher/latest-courses/:teacherId',
            feedback: '/service-proxy/study-center/teacher/feedback'
        },
        classFeedback: '/service-proxy/study-center/class-feedback/:feedbackId'
    },

    corp: {
        member: {
            register: '/corp-service-proxy/member/register',
            login: '/corp-service-proxy/member/login',
            uploadLicense: '/corp-service-proxy/member/upload-license',
            uploadProfile: '/corp-service-proxy/member/upload-profile',
            basicInfo: '/corp-service-proxy/member/basic-info',
            signOut: '/corp-service-proxy/member/sign-out',
            profile: '/corp-service-proxy/member/profile',
            ssoInfo: '/corp-service-proxy/member/sso-profile',
            changePassword: '/corp-service-proxy/member/change-password',
            changeMobile: '/corp-service-proxy/member/change-mobile'
        },
        jobapply: {
            publishedPositions: '/corp-service-proxy/jobapply/publishedPositions',
            todo: '/corp-service-proxy/jobapply/todo',
            dropCandidate: '/corp-service-proxy/jobapply/dropCandidate',
            markCandidate: '/corp-service-proxy/jobapply/markCandidate'
        },
        candidate: {
            resume: '/corp-service-proxy/candidate/resume',
            dropProtenial: '/corp-service-proxy/candidate/dropCandidate',
            restoreProtenial: '/corp-service-proxy/candidate/restoreCandidate',
            dropped: '/corp-service-proxy/candidate/dropped',
            potential: '/corp-service-proxy/candidate/potential'
        },
        job: {
            publish: '/corp-service-proxy/job/publish'
        },
        recommend: {
            smart: '/corp-service-proxy/recommend/smart',
            champion: '/corp-service-proxy/recommend/champion',
            markCandidate: '/corp-service-proxy/recommend/markCandidate'
        },
        talent: {
            save: '/corp-service-proxy/talent/save',
            search: '/corp-service-proxy/talent/search'
        },
        resource: {
            qualifications: '/corp-service-proxy/resources/qualifications',
            worktype: '/corp-service-proxy/resources/worktype',
            communityposition: '/corp-service-proxy/resources/communityposition',
            language: '/corp-service-proxy/resources/language',
            langguageproficiency: '/corp-service-proxy/resources/langguageproficiency',
            englishlevel: '/corp-service-proxy/resources/englishlevel',
            industry: '/corp-service-proxy/resources/industry',
            salarytype: '/corp-service-proxy/resources/salarytype',
            job: '/corp-service-proxy/resources/job'
        },
        resources: {
            tags: '/corp-service-proxy/resources/tags/:query?',
            industry: '/corp-service-proxy/resources/industry/:query?',
            corpScales: '/corp-service-proxy/resources/corpscale/:query?',
            natureOfFirms: '/corp-service-proxy/resources/nature-of-firms/:query?'
        },
        sms: {
            sendWithoutCaptcha: '/corp-service-proxy/sms/send-without-captcha',
            sendWithCaptcha: '/corp-service-proxy/sms/send-with-captcha'
        }
    },

    general: {
        sms: {
            send: '/service-proxy/sms/send'
        }
    }
};