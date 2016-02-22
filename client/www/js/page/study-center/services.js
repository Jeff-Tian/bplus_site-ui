angular.module('studyCenterModule')
    .factory('FileReaderService', ['$q', function ($q) {
        function readAsDataUri(file, scope) {
            var deferred = $q.defer();

            var reader = new FileReader();
            reader.onload = function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
            reader.onerror = function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
            reader.onprogress = function (event) {
                scope.$broadcast('fileProgress', {
                    total: event.total,
                    loaded: event.loaded
                });
            };

            reader.readAsDataURL(file);

            return deferred.promise;
        }

        return {
            readAsDataUri: readAsDataUri
        };
    }])
;