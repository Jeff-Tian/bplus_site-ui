var router = require('express').Router();
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var ejs = require('ejs');

router.use(function (req, res, next) {
    //res.send('ok');
    next();
});

router.get('/my', function (req, res, next) {
    renderMixin(res, 'my.jade', 'mylayout.jade');
});

router.get('/offers', function (req, res, next) {
    renderMixin(res, 'offers.jade', 'offers-layout.jade');
});

function renderMixin(res, jadeTemplate, jadeLayout) {
    var o = {
        basedir: '/',
        filename: path.join(__dirname, '/../client/views/', jadeTemplate)
    };

    var contents = fs.readFileSync(__dirname + '/../client/views/' + jadeTemplate, 'utf-8');
    contents = 'extends ' + res.locals.onlineStoreTemplate + jadeLayout + '\n' + contents;

    var compiled = jade.compile(contents, o);
    compiled = compiled(res.locals);

    o.filename = path.join(__dirname, '/../client/www/view-partial/store-index.html');
    res.send(ejs.render(compiled, res.locals, o));
}

module.exports = router;