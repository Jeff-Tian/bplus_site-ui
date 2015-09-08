(function (exports) {
    exports.service = function ($http, $q) {
        var s = {};

        s.post = function (url, data) {
            var dfd = $q.defer();

            $http.post(url, data)
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
        };

        return s;
    };

    exports.service.$inject = ['$http', '$q'];
})(angular.bplus = angular.bplus || {});