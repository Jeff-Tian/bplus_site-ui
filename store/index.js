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
    res.locals.test = 'test;';

    res.render(res.locals.onlineStoreTemplate + 'mylayout.jade', {});
});

router.get('/you', function (req, res, next) {
    var o = {
        basedir: '/',
        filename: path.join(__dirname, '/../client/views/you.jade')
    };

    var contents = fs.readFileSync(__dirname + '/../client/views/you.jade', 'utf-8');
    contents = 'extends ' + res.locals.onlineStoreTemplate + 'mylayout.jade' + '\n' + contents;

    var compiled = jade.compile(contents, o);
    compiled = compiled(res.locals);

    o.filename = path.join(__dirname, '/../client/www/view-partial/store-index.html');
    res.send(ejs.render(compiled, res.locals, o));
});

router.get('/ok', function (req, res, next) {
    console.log(res.locals);

    res.writeHead(200, {'Content-Type': 'text/html'});

    var ret = fs.readFileSync(__dirname + '/../client/views/layout.jade', 'utf-8');
    var fn = jade.compile(ret);
    var o = res.locals;
    var jadeResult = fn(o);

    function test(a) {
        return a;
    }

    var ejsIncludes = {};
    var i = 0;
    var regex = /<!--\s*<%-\s*include\("([^"]+)"\)\s*-%>-->/g;
    jadeResult = jadeResult.replace(regex, function (match, p1, offset, source) {
        ejsIncludes[p1] = '';
        i++;

        return match;
    });

    for (var fileName in ejsIncludes) {
        ejs.renderFile(__dirname + fileName, o, {}, function (err, result) {
            i--;

            if (err) {
                next(err);
            }

            ejsIncludes[fileName] = result;
            console.log(ejsIncludes);

            if (i <= 0) {
                jadeResult = jadeResult.replace(regex, function (match, p1, offset, source) {
                    return ejsIncludes[p1];
                });

                res.write(jadeResult);
                res.end();
            }
        });
    }

    //res.write('' + i);
    //
    //res.end();
});

module.exports = router;