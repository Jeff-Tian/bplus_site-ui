(function (exports) {
    exports.service = function ($http, $q) {
        function handleHttpPromise(httpPromise) {
            var dfd = $q.defer();

            httpPromise
                .success(function (res) {
                    if (res.isSuccess) {
                        dfd.resolve(res);
                    } else {
                        dfd.reject(res.message);
                    }
                }).error(function (reason) {
                    dfd.reject(reason);
                });

            return dfd.promise;
        }

        var s = {};

        for (var method in $http) {
            if (typeof $http[method] === 'function') {
                s[method] = (function (m) {
                    return function () {
                        return handleHttpPromise($http[m].apply(this, Array.prototype.slice.call(arguments)));
                    };
                })(method);   // jshint ignore:line
            }
        }

        return s;
    };

    exports.service.$inject = ['$http', '$q'];
})(angular.bplus = angular.bplus || {});