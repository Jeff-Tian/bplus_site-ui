var localeHelper = require('../locales/localeHelper.js');
var assert = require('assert');

describe('Locale Helper', function () {
    it('should generate other locale link according to requested url', function () {
        assert.equal('/zh/signin', localeHelper.generateLocaleLink('/signin', 'zh'));
        assert.equal('/zh/signin', localeHelper.generateLocaleLink('/en/signin', 'zh'));
    });

    it('should map request path to view accordingly', function () {
        assert.equal(true, localeHelper.regexPath('/signin').test('/signin'));
        assert.equal(false, localeHelper.regexPath('/signin').test('/m/signin'));
    });
});