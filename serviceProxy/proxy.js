var http = require('http');

function proxy(req, res, next, host, port, requestPath, map, headers) {
    var options = {
            host: host,
            port: port || '80',
            path: requestPath || req.originalUrl,
            method: req.method,
            headers: headers || {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        },

        request = http.request(options, function (response) {
            response.pipe(res);
        });

    request.on('error', next);

    var data = req.body;

    if (typeof map === 'function') {
        data = map(data);
    }

    request.write(JSON.stringify(data));
    request.end();
}

module.exports = function (host, port, path, map, headers) {
    return function (req, res, next) {
        proxy(req, res, next, host, port, path, map, headers);
    };
};

