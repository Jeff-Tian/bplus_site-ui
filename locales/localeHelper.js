(function () {
    var i18n = {};

    if (typeof require === 'function') {
        i18n = require('i18n');
    }

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

        getLocale: function (url) {
            var locale = 'zh';
            var l = new RegExp('^/(' + helper.supportedLocales.join('|') + ')', 'i');

            if (l.test(url)) {
                var a = l.exec(url);
                locale = a[1];
            }

            return locale;
        },

        setLocale: function (req, res, next) {
            var locale = helper.getLocale(req.url);

            console.log('current locale for "' + req.url + '" is ' + locale);

            i18n.setLocale(locale);
            res.setLocale(locale);

            next();
        },

        setLocalVars: function (req, res, next) {
            res.locals.otherLocale = i18n.getLocale(req) === 'zh' ? 'en' : 'zh';
            res.locals.otherLocaleLink = helper.generateLocaleLink(req.url, res.locals.otherLocale);
            res.locals.localeLink = function (path) {
                if (path[0] !== '/') {
                    path = '/' + path;
                }

                return '/' + i18n.getLocale(req) + path;
            };

            next();
        },

        serveTranslations: function (req, res, next) {
            if (!req.query.lang) {
                res.status(500).send();
                return;
            }

            try {
                var lang = require('../locales/' + req.query.lang);
                res.send(lang);
            } catch (err) {
                req.dualLogError(err);
                res.status(404).send();
            }
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = helper;
    } else if (typeof angular !== 'undefined') {
        angular.bplus = angular.bplus || {};
        angular.bplus.localeHelper = helper;
    }
})();