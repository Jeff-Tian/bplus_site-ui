module.exports = {
    isFromMobile: function (ua) {
        return /mobile/i.test(ua);
    },

    isFromWechatBrowser: function (ua) {
        return /MicroMessenger/i.test(ua);
    },

    isFromAndroid: function (ua) {
        return /android/i.test(ua)
    }
};