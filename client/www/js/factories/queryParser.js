(function (exports) {
    exports.queryParser = function () {
        var q = {
            getQueryString: function () {
                return window.location.search || window.location.hash;
            }
        };

        q.get = function (query, key) {
            if (arguments.length === 1) {
                key = query;
                query = q.getQueryString();
            }

            var index = query.indexOf(key);
            if (index >= 0) {
                var end = query.indexOf('&', index + key.length);

                if (end < 0) {
                    end = query.length;
                }

                return query.substring(index + key.length + 1, end);
            } else {
                return '';
            }
        };

        return q;
    };

    exports.queryParser.$inject = [];
})(angular.bplus = angular.bplus || {});