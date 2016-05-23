function getMode() {
    return process.env.NODE_ENV || 'dev';
}

module.exports = {
    getMode: getMode,
    filterConfig: function (config) {
        var filtered = {};

        filtered.captcha = config.captcha;
        filtered.payment = config.payment.public;
        filtered.cdn = config.cdn;
        filtered.featureSwitcher = config.featureSwitcher;
        filtered.service_upload = config.service_upload;
        filtered.trackingUrl = config.trackingUrl;
        filtered.serviceUrls = config.serviceUrls;
        filtered.competitions = config.competitions;
        filtered.mode = getMode();
        filtered.durableMessageSource = config.durableMessageSource;

        return filtered;
    }
};