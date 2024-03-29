(function (exports) {
    /**
     * A $http wrapper that dedicate to pre handle the return data by service api. For example, check the
     * isSuccess and invoke the successCallback and errorCallback accordingly.
     *
     * Without it, you have to write code like this:
     *      $http.get(url)
     *          .success(function(res){
     *              if(res.isSuccess) {
     *                  successCallback(res.result);
     *              } else {
     *                  errorCallback(res.message);
     *              }
     *          }).error(function(res){
     *              errorCallback(res.message);
     *          })
     *      ;
     *
     * With service, you can simplify the above code to:
     *      $service.get(url)
     *          .then(successCallback)
     *          .catch(errorCallback)
     *      ;
     *
     * For each method provided by $http, service has one with the same name:
     *      $http.get       --> service.get
     *      $http.post      --> service.post
     *      $http.delete    --> service.delete
     *      ...
     *
     * @param $http
     * @param $q
     * @returns {{}}
     */
    exports.service = function ($http, $q) {
        function handleHttpPromise(httpPromise) {
            var dfd = $q.defer();

            httpPromise
                .success(function (res) {
                    if (res.isSuccess) {
                        dfd.resolve(res.result || res.results);
                    } else {
                        console.error(res);
                        console.error(httpPromise.value);

                        if (typeof res.code !== 'undefined') {
                            dfd.reject(res);

                            if (String(res.code) === '302') {
                                window.location.href = res.message;
                            }
                        } else {
                            dfd.reject(res.message || '服务器返回错误的数据');
                        }
                    }
                }).error(function (reason) {
                    dfd.reject(reason);

                    if (reason && reason.code && String(reason.code) === '401') {
                        window.location.href = '/sign-in?return_url=' + encodeURIComponent(window.location.href);
                    }
                });

            return dfd.promise;
        }

        var s = {};

        // Inherits $http to s
        for (var method in $http) {
            if ($http.hasOwnProperty(method) && typeof $http[method] === 'function') {
                s[method] = (function (m) {// jshint ignore:line
                    return function () {
                        return handleHttpPromise($http[m].apply(this, Array.prototype.slice.call(arguments)));
                    };
                })(method);   // jshint ignore:line
            }
        }

        // s' own methods
        s.executePromiseAvoidDuplicate = function (scope, flag, promise) {
            var dfd = $q.defer();

            if (scope[flag]) {
                dfd.reject('submitting...');

                return dfd;
            }

            scope[flag] = true;
            return promise().finally(function () {
                scope[flag] = false;
            });
        };

        // s' own properties

        return s;
    };

    exports.service.$inject = ['$http', '$q'];
})(angular.bplus = angular.bplus || {});