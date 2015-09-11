(function (exports) {
    exports.translationLoader = function ($http, $q) {
        return function (options) {
            var dfd = $q.defer();

            $http({
                method: 'GET',
                url: '/translation?lang=' + options.key
            })
                .success(dfd.resolve)
                .error(dfd.reject);

            return dfd.promise;
        };
    };

    exports.translationLoader.$inject = ['$http', '$q'];
})(angular.bplus = angular.bplus || {});