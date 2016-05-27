var mobileDetector = require('../mobile/mobileDetector');
var fs = require('fs');
var urlParser = require('url');
var localeHelper = require('../locales/localeHelper.js');
var supportedLocales = localeHelper.supportedLocales;

function renderIndex(req, res, next) {
    if (!mobileDetector.isRequestFromMobileOrPad(req)) {
        return res.render(__dirname + '/../client/www/bower/bridgeplus_ui/public/index.html');
    }

    tryRenderMobileTemplate('index', req, res);
}

function render20152016Index(req, res, next) {
    if (!mobileDetector.isRequestFromMobileOrPad(req)) {
        return res.render('index');
    }

    tryRenderMobileTemplate('index', req, res);
}

function renderMobileTemplate(template, req, res) {
    var redirectTo = '/m/' + template;
    var query = urlParser.parse(req.url).query;

    return res.redirect(query ? redirectTo + '?' + query : redirectTo);
}

function tryRenderMobileTemplate(template, req, res) {
    try {
        var stats = fs.lstatSync(staticFolder + '/mobile/' + template + '.html');

        if (stats.isFile()) {
            return renderMobileTemplate(template, req, res);
        }

        return res.render(template);
    } catch (ex) {
        return res.render(template);
    }
}

module.exports = function (server) {
    server.get('/', renderIndex);
    server.get('/index', renderIndex);

    supportedLocales.map(function (l) {
        server.get('/' + l, renderIndex);
        server.get('/' + l + '/index', renderIndex);
    });

    server.get(localeHelper.localePath('/index-2015-2016', false), render20152016Index);
};