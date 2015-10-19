module.exports = {
    isFromMobile: function (ua) {
        return /mobile/i.test(ua);
    }
};