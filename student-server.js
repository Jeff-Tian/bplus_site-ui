// Use Expressjs as Node.js web framework
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var i18n = require('i18n');
var localeHelper = require('./locales/localeHelper.js');
var Logger = require('logger');
var config = require('./config');
var membership = require('./serviceProxy/membership.js');

// To keep it from deleting by "npm prune --production"
//require('log4js-cassandra');
//var logger = (Logger.init(config.logger), Logger(pack.name + pack.version));
var logger = {
    info: function () {
    },
    error: function () {
    }
};
var mobileDetector = require('./mobile/mobileDetector');
var urlParser = require('url');
var fs = require('fs');

var supportedLocales = localeHelper.supportedLocales;
var subApps = ['corp'];
i18n.configure({
    locales: supportedLocales,
    directory: __dirname + '/locales',
    updateFiles: false
});

// Node.js template engine
var ejs = require('ejs');

function setLogger(req, res, next) {
    function dualLogError(o) {
        logger.error(o);
        console.error(o);
    }

    function dualLog(o) {
        logger.info(o);
        console.log(o);
    }

    req.logger = logger;
    req.dualLogError = dualLogError;
    req.dualLog = dualLog;

    next();
}

function setCDN(req, res, next) {
    res.locals.cdn = config.cdn;

    next();
}

function setFeatureSwitcher(req, res, next) {
    res.locals.featureSwitcher = config.featureSwitcher;
    next();
}

function setConfig(req, res, next) {
    res.locals.config = config;
    next();
}

function setDeviceHelper(req, res, next) {
    var ua = req.headers['user-agent'];

    res.locals.device = {
        isFromMobile: mobileDetector.isFromMobile(ua),
        isFromWechatBrowser: mobileDetector.isFromWechatBrowser(ua),
        isFromAndroid: mobileDetector.isFromAndroid(ua)
    };

    next();
}

function getMode() {
    return process.env.NODE_ENV || 'dev';
}

function setMode(req, res, next) {
    res.locals.dev_mode = (getMode() === 'dev');

    next();
}

function onlineOfflinePathSwitch(onlinePath, offlinePath) {
    return !(process.env.RUN_FROM === 'jeff') ? onlinePath : offlinePath;
}

function setOnlineStoreTemplate(req, res, next) {
    res.locals.onlineStoreTemplate = __dirname + onlineOfflinePathSwitch(
            '/node_modules/',
            '/../') +
        'online-store/views/';

    next();
}

server
    .use(Logger.express("auto"))
    .use(setLogger)
    .use(setCDN)
    .use(setFeatureSwitcher)
    .use(setConfig)
    .use(setDeviceHelper)
    .use(setMode)
    .use(setOnlineStoreTemplate)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));

// Set the view engine to ejs, but specify file type with ".html"
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');

server.use(i18n.init);

server.all('*', localeHelper.setLocale, localeHelper.setLocalVars, function (req, res, next) {
    if (req.query.code && req.query.state) {
        // Redirected from Wechat?
        return res.redirect(new Buffer(req.query.state, 'base64').toString());
    }

    next();
});

server.use('/', membership.setSignedInUser);

var staticFolder = __dirname + (getMode() === 'dev' ? '/client/www' : '/client/dist');
var viewFolder = __dirname + '/client/views';

var staticSetting = {
    etag: true,
    lastModified: true,
    maxAge: 1000 * 3600 * 24 * 30,
    setHeaders: function (res, path) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
};

server.get('/', renderIndex);
supportedLocales.map(function (l) {
    server.get('/' + l, renderIndex);
});

// Customize client file path
server.set('views', [staticFolder, viewFolder]);

if (process.env.RUN_FROM === 'jeff') {
    server.use(localeHelper.localePath('/bower/SHARED-UI', false), express.static('/Users/tianjie/SHARED-UI'));

    server.use(localeHelper.localePath('/bower_components/SHARED-UI', false),
        express.static('/Users/tianjie/SHARED-UI'));
}

function setupStaticResources() {
    var staticServer = express.static(staticFolder, staticSetting);

    server.use(staticServer);
    supportedLocales.concat(subApps).map(function (l) {
        server.use('/' + l, staticServer);
    });
}

setupStaticResources();

server.use(localeHelper.localePath('/m', false), express.static(staticFolder));

if (getMode() === 'dev') {
    server.use('/translation/localeHelper.js', express.static(__dirname + '/locales/localeHelper.js', staticSetting));
} else {
    server.use('/translation/localeHelper.js', express.static(__dirname + '/client/dist/translation/localeHelper.js', staticSetting));
}

server.use(/\/(?:corp\/)?config\.js/, function (req, res, next) {
    res.setHeader("Content-Type", "text/javascript; charset=utf-8");
    res.send('if (typeof angular !== "undefined") {angular.bplus = angular.bplus || {}; angular.bplus.config = ' + JSON.stringify(filterConfig(config)) + '; }');
});

var proxy = require('./serviceProxy/proxy.js');
server.use(/^\/(?!service-proxy|studycenter|cmpt|(?:(?:zh|en)\/)?(?:m\/)?personal-history).*$/i, function (req, res, next) {
    if (res.locals.hcd_user && res.locals.hcd_user.member_id) {
        return proxy.execute(req, res, next, {
            host: config.bplusService.host,
            port: config.bplusService.port,
            method: 'GET',
            path: '/profile/load/' + res.locals.hcd_user.member_id,
            responseInterceptor: function (originalResponse, upstreamJson, originalRequest, next) {
                res.locals.needFillEducation = !upstreamJson.result.education || upstreamJson.result.education.length <= 0;

                next();
            }
        });
    }

    next();
}, function (req, res, next) {
    if (res.locals.needFillEducation === true) {
        res.redirect('/personal-history');
    } else {
        next();
    }
});


server.all('*', localeHelper.setLocale, localeHelper.setLocalVars);

server.use('/', require('./serviceProxy/membership.js').setSignedInUser);

function renderIndex(req, res, next) {
    renderOrRedirect(req, res, 'index');
}

function renderTemplate(name) {
    return function (req, res, next) {
        res.render(name);
    };
}

function renderOrRedirect(req, res, template) {
    if (!isFromMobile(req)) {
        res.render(template);
    } else {
        console.log('request from mobile');
        try {
            var stats = fs.lstatSync(staticFolder + '/mobile/' + template + '.html');
            if (stats.isFile()) {
                var redirectTo = '/m/' + template;
                var query = urlParser.parse(req.url).query;
                res.redirect(query ? redirectTo + '?' + query : redirectTo);
            } else {
                res.render(template);
            }
        } catch (e) {
            res.render(template);
        }
    }
}
function mapRoute2Template(url, template, pipes) {
    if (typeof template !== 'string') {
        pipes = template;
        template = url;

        if (template[0] === '/') {
            template = template.substr(1);
        }
    }
    pipes = pipes || [];
    pipes.push(function (req, res, next) {
        renderOrRedirect(req, res, template);
    });

    var args = [localeHelper.localePath(url)].concat(pipes);

    server.get.apply(server, args);
}

function isFromMobile(req) {
    var ua = req.headers['user-agent'];
    return mobileDetector.isFromMobile(ua) || mobileDetector.isFromPad(ua);
}

function filterConfig(config) {
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

server.use('/translation', localeHelper.serveTranslations);
subApps.map(function (s) {
    server.use('/' + s + '/translation', localeHelper.serveTranslations);
});

function checkWechatHostAndSetCookie(req, res, next) {
    var query = urlParser.parse(req.url).query;
    if (query && query.indexOf("source=wechatServiceAccount") > -1) {
        res.cookie('source', "wechatServiceAccount");
    }
    next();
}
server.use(localeHelper.localePath('/m', false), checkWechatHostAndSetCookie);
server.use(localeHelper.localePath('/m', false), require('./mobile'));

server.use(localeHelper.localePath('/online-store', false), require(onlineOfflinePathSwitch('online-store', '../online-store')));

function setupOnlineStoreStaticResources(staticFolder) {
    server.use(
        localeHelper.localePath('/' + staticFolder, false),
        express.static(
            __dirname +
            onlineOfflinePathSwitch(
                '/node_modules/',
                '/../') +
            (getMode() === 'dev' ? 'online-store/public/' : 'online-store/dist/') +
            staticFolder,
            staticSetting
        )
    );
}

if (process.env.RUN_FROM === 'jeff') {
    server.use(localeHelper.localePath('/bower/SHARED-UI', false), express.static('/Users/tianjie/SHARED-UI'));

    server.use(localeHelper.localePath('/bower_components/SHARED-UI', false), express.static('/Users/tianjie/SHARED-UI'));
}

//setupOnlineStoreStaticResources('semantic');
server.use(localeHelper.localePath('/semantic', false), express.static(__dirname + '/client/dist/semantic', staticSetting));
//setupOnlineStoreStaticResources('bower_components');
server.use(localeHelper.localePath('/bower_components', false), express.static(__dirname + '/client/dist/bower', staticSetting));
setupOnlineStoreStaticResources('images');
setupOnlineStoreStaticResources('stylesheets');
setupOnlineStoreStaticResources('scripts');

server.use(localeHelper.localePath('/store', false), membership.ensureAuthenticated, require('./store'));

server.use(localeHelper.localePath('/study-center', false), membership.ensureAuthenticated, require('./routes/study-center.js'));

server.use(localeHelper.localePath('/corp', false), require('./routes/corp.js'));

server.use('/service-proxy', require('./serviceProxy'));
subApps.map(function (s) {
    server.use('/' + s + '/service-proxy', require('./serviceProxy'));
});

//Competion Integration

server
    .get('/:lang/game', function (req, res, next) {
        var lang = req.params.lang;
        if (['zh', 'en'].indexOf(lang) < 0) {
            return next();
        }
        if (!res.locals.hcd_user) {
            return next();
        }
        res.redirect('/zh/cmpt');
    })
    .get('/:lang/cmpt/:page?', function (req, res, next) {
        var lang = req.params.lang;
        if (['zh', 'en'].indexOf(lang) < 0) {
            return next();
        }
        var page = req.params.page || 'index';
        if (page == 'index' && !res.locals.hcd_user) {
            return membership.ensureAuthenticated(req, res, next);
        }
        res.render('competion/' + page, {
            page: page,
            lang: lang
        });
    })
    .use('/cmpt', !(process.env.RUN_FROM === 'jeff') ? require('competion-api')(express) : require('../cmpt2015-api')(express))
    .get(localeHelper.localePath('/studycenter', true), membership.ensureAuthenticated, function (req, res, next) {
        var lang = localeHelper.getLocale(req.url, req);
        var redirect = '/studycenter/';

        if (lang) {
            redirect = '/' + lang + redirect;
        }

        res.redirect(redirect);
    })
    .get('/:lang?/studycenter/:page?', membership.ensureAuthenticated, function (req, res, next) {
        var lang = req.params.lang || localeHelper.getLocale(req.url, req);

        if (localeHelper.supportedLocales.indexOf(lang) < 0) {
            return next();
        }

        var page = req.params.page || 'teachercourse';

        try {
            res.render('study-center-ui/' + page, {
                page: page,
                lang: lang
            });
        } catch (ex) {
            next();
        }
    })
    .use('/studycenter', require('study-center-proxy')(express));

mapRoute2Template('/index');
mapRoute2Template('/game');
mapRoute2Template('/contractus');
mapRoute2Template('/aboutus');
mapRoute2Template('/school');
mapRoute2Template('/statement');
mapRoute2Template('/youth');
mapRoute2Template('/preheating');
mapRoute2Template('/opportunity');
server.get('/data', require('./client/www/api/data.js').getData);
mapRoute2Template('/sign-in');
mapRoute2Template('/signin', 'sign-in');
mapRoute2Template('/reset-password-by-email');
mapRoute2Template('/reset-password');
mapRoute2Template('/set-password');
mapRoute2Template('/sign-up-from', 'bind-mobile', [membership.ensureAuthenticated]);
mapRoute2Template('/bind-mobile', [membership.ensureAuthenticated]);
mapRoute2Template('/personal-history', [membership.ensureAuthenticated]);
mapRoute2Template('/profile', [membership.ensureAuthenticated]);
mapRoute2Template('/game-training', [membership.ensureAuthenticated]);
mapRoute2Template('/upsell', [membership.ensureAuthenticated]);
mapRoute2Template('/offers');
mapRoute2Template('/paymentresult', [membership.ensureAuthenticated]);
mapRoute2Template('/map');
server.get(localeHelper.localePath('/opportunity-detail'), function (req, res, next) {
    if (!isFromMobile(req)) {
        res.render('opportunity-detail');
    } else {
        res.render('mobile/opportunity-detail');
    }
});

server.get(localeHelper.localePath('/ranking'), function (req, res, next) {
    if (!isFromMobile(req)) {
        if (res.locals.hcd_user) {
            res.redirect('/zh/cmpt/ranking');
        } else {
            res.render('ranking');
        }
    } else {
        res.render('mobile/ranking');
    }
});

server.get(localeHelper.localePath('/study'), membership.ensureAuthenticated, function (req, res, next) {
    if (!isFromMobile(req)) {
        res.render('game-training');
    } else {
        res.redirect('/m/game-training');
    }
});
server.get(localeHelper.localePath('/select-payment-method'), membership.ensureAuthenticated, function (req, res, next) {
    if (!isFromMobile(req)) {
        res.render('select-payment-method');
    } else {
        res.redirect('/m#/select-payment-method');
    }
});
server.get(localeHelper.localePath('/account-setting'), membership.ensureAuthenticated, renderTemplate('account-setting'));
server.get(localeHelper.localePath('/email-verify'), require('./email-verify.js'));

server.get('/messages', function (req, res, next) {
    res.json(JSON.parse(fs.readFileSync('messages.json')));
});

server.use('/healthcheck', function (req, res, next) {
    res.json({
        everything: 'is ok',
        time: new Date()
    });
});

server.get('/test', function (req, res, next) {
    var ua = req.headers['user-agent'];
    res.send(req.url);
});

server.get('/mode', function (req, res, next) {
    res.send(res.locals.dev_mode);
});

server.get('/is_qa', function (req, res) {
    res.send('is_qa = ' + process.env.IS_QA);
});

server.get('/run_from', function (req, res) {
    res.send('run_form = ' + process.env.RUN_FROM);
});

server.get('/locale', function (req, res, next) {
    res.send(req.getLocale());
});

function logErrors(err, req, res, next) {
    req.logger.error(err);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        req.dualLogError(err);
        res.status(500).send({isSuccess: false, code: '500', message: 'Something blew up!'});
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    req.dualLogError(err);
    res.status(500);
    if (!isFromMobile(req)) {
        res.render('error', {error: err});
    } else {
        res.render('mobile/error', {error: err});
    }
}

server.use('*', function (req, res) {
    req.dualLogError('404 Error met for "' + (req.headers['origin'] + req.originalUrl) + '". The referer is "' + req.headers['referer'] + '".');

    res.status(404);
    if (!isFromMobile(req)) {
        res.render('404.html');
    } else {
        res.render('mobile/404.html');
    }
});

server.use(logErrors);
server.use(clientErrorHandler);
server.use(errorHandler);

// Host & Port
var port = process.env.PORT || config.port;
server.listen(port, function () {
    console.log(port + ' is for Bridge+ ');
});