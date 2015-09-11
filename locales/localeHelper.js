var i18n = require('i18n');

var supportedLocales = ['zh', 'en'];

var helper = {
    supportedLocales: supportedLocales,

    defaultLocale: supportedLocales[0],

    generateLocaleLink: function (url, locale) {
        var localePattern = new RegExp('^(?:/(?:' + helper.supportedLocales.join('|') + '))?(.+$)', 'i');

        return url.replace(localePattern, '/' + locale + '$1');
    },

    regexPath: function (p) {
        return new RegExp('(?:/(' + helper.supportedLocales.join('|') + '))?' + p, 'i');
    },

    setLocale: function (req, res, next) {
        var locale = 'zh';
        var l = new RegExp('^/(' + helper.supportedLocales.join('|') + ')', 'i');

        if (l.test(req.url)) {
            var a = l.exec(req.url);
            locale = a[1];
        }

        i18n.setLocale(locale);
        res.setLocale(locale);

        next();
    },

    setLocalVars: function (req, res, next) {
        res.locals.otherLocale = i18n.getLocale(req) === 'zh' ? 'en' : 'zh';
        res.locals.otherLocaleLink = helper.generateLocaleLink(req.url, res.locals.otherLocale);

        next();
    }
};

module.exports = helper;