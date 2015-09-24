var http = require('http');

/**
 * make a proxy delegate with less options
 * @param req
 * @param res
 * @param next
 * @param host
 * @param port
 * @param requestPath
 * @param map: the mapper function to tweak the passing data
 * @returns {Function|*}
 */
function basicProxy(req, res, next, host, port, requestPath, map) {
    return advancedProxy(req, res, next, {
        host: host,
        port: port,
        path: requestPath,
        dataMapper: map
    });
}

/**
 * make a proxy delegate with more options
 * @param req
 * @param res
 * @param next
 * @param settings
 */
function advancedProxy(req, res, next, settings) {
    var options = {
            host: settings.host,
            port: settings.port || '80',
            path: settings.path || req.originalUrl,
            method: settings.method || req.method,
            headers: settings.headers || {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        },

        chunks = []
        ;

    req.dualLog('proxying...');
    req.dualLog(options);

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
                    req.dualLogError('Error while trying to parse JSON from: ');
                    req.dualLogError(chunks.toString());
                    req.dualLogError(e.stack);
                    return next(e);
                }

                if (settings.responseInterceptor(res, chunks)) {
                    next();
                } else {
                    res.send(chunks);
                }
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

            if (data) {
                request.write(JSON.stringify(data));
            }
        }
    }

    request.end();
}

/**
 * make a proxy delegate
 * @param options
 * @returns {Function}
 */
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

/**
 * execute a proxy request immediately
 * @param req
 * @param res
 * @param next
 * @param options
 */
proxy.execute = function (req, res, next, options) {
    advancedProxy(req, res, next, options);
};

module.exports = proxy;

