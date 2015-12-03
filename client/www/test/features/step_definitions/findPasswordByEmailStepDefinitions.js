module.exports = function () {
    this.When(/^I go to the page$/, function (callback) {
        this.visit('http://uat.bridgeplus.cn', callback);
    });

    this.Then(/^I should see the captcha$/, function (callback) {

    });
};