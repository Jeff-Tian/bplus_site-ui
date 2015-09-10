var http = require('http');

function basicProxy(req, res, next, host, port, requestPath, map) {
    return advancedProxy(req, res, next, {
        host: host,
        port: port,
        path: requestPath,
        dataMapper: map
    });
}

function advancedProxy(req, res, next, settings) {
    var options = {
            host: settings.host,
            port: settings.port || '80',
            path: settings.path || req.originalUrl,
            method: req.method,
            headers: settings.headers || {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        },

        chunks = []
        ;

    var request = http.request(options, function (response) {
        if (typeof settings.responseInterceptor === 'function') {
            response.on('data', function (c) {
                chunks.push(c);
            });

            response.on('end', function () {
                chunks = Buffer.concat(chunks);

                try {
                    chunks = JSON.parse(chunks.toString());
                } catch (e) {
                    return next(e);
                }

                settings.responseInterceptor(res, chunks);

                res.send(chunks);
                next();
            });

            response.on('error', next);
        } else {
            response.pipe(res);
        }
    });

    request.on('error', next);

    if (typeof settings.requestInterceptor === 'function') {
        settings.requestInterceptor(req, request);
    } else {
        if (options.method !== 'GET') {
            var data = req.body;

            if (typeof settings.dataMapper === 'function') {
                data = settings.dataMapper(data);
            }

            request.write(JSON.stringify(data));
        }
    }

    request.end();
}

function proxy(options) {
    var args = arguments;

    return function (req, res, next) {
        if (typeof options === 'object' && !!options) {
            advancedProxy.apply(this, [req, res, next, options]);
        } else {
            basicProxy.apply(this, [req, res, next, args[0], args[1], args[2], args[3]]);
        }
    };
}

proxy.execute = function (req, res, next, options) {
    advancedProxy(req, res, next, options);
};

module.exports = proxy;

