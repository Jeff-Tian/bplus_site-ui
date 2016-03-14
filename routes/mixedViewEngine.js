var jade = require('jade');
var ejs = require('ejs');
var path = require('path');
var fs = require('fs');
var localeHelper = require('../locales/localeHelper.js');

function renderMixin(res, jadeTemplate, jadeLayout, data) {
    var o = {
        basedir: '/',
        filename: path.join(__dirname, '/../client/views/', jadeTemplate)
    };

    var contents = fs.readFileSync(__dirname + '/../client/views/' + jadeTemplate, 'utf-8');

    if (jadeLayout) {
        contents = 'extends ' + jadeLayout + '\n' + contents;
    }

    var compiled = jade.compile(contents, o);
    compiled = compiled(data || {});

    o.filename = path.join(__dirname, '/../client/www/view-partial/store-index.html');
    res.send(ejs.render(compiled, res.locals, o));
}

module.exports = {
    render: renderMixin,
    renderEJS: function (app, url) {
        var template = url;

        if (template[0] === '/') {
            template = template.substr(1);
        }

        app.get(localeHelper.localePath(url), function (req, res, next) {
            res.render(template);
        });

        return this;
    }
};