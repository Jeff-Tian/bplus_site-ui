(function (exports) {
    var dataArray = [];
    var dataObject= {};
    var todoIndex = 0;
    var doingPromise = {};
    var MACHINE_STATUS = {
        STOPPED: "stop",
        WORKING: "working",
        IDLE: "idle"
    };
    var PROMISE_STATUS = {
        PENDING: "pending",
        WORKING: "working",
        DONE: "done",
        INVALID: "invalid"
    };
    var machine_status = MACHINE_STATUS.STOPPED;
    var KeyStructure = {
        url: "",
        params: ""
    }
    var status = null;
    exports.PipeCacheService = function (service, $http) {
        var createPromise = function(paramWithURL) {
            return service.handleHttpPromise($http({
                url: paramWithURL.url,
                params: paramWithURL.params,
                method: "GET"
            }));
        }
        var findNext = function() {
            if (dataArray[todoIndex]) {
                return dataArray[todoIndex++];
            }
        };
        var run = function() {
            setInterval(function() {
                if (Object.keys(doingPromise).length === 0) {
                    var next = findNext();
                    if (next) {
                        getData(next);
                    }
                }
            }, 500);
        };
        var addKeyWithStatus = function(paramWithURL, status) {
            dataObject[JSON.stringify(paramWithURL)] = {
                data: {},
                index: dataArray.push(paramWithURL) - 1, 
                status: status,
                promise: null
            };
        };
        var getData = function(paramWithURL) {
            var data =dataObject[JSON.stringify(paramWithURL)];
            doingPromise[JSON.stringify(paramWithURL)] = true;
            var promise = createPromise(paramWithURL).then(function(retData) {
                if (data) {
                    data.status = (data.status === PROMISE_STATUS.INVALID) ? PROMISE_STATUS.INVALID : PROMISE_STATUS.DONE;
                    data.promise = null;
                    data.data = retData;
                }
                delete doingPromise[JSON.stringify(paramWithURL)];
                return retData;
            });
            if (data) {
                if (data.status === PROMISE_STATUS.PENDING) {
                    data.status = PROMISE_STATUS.WORKING;
                    data.promise = promise;
                }
            }
            return promise;
        };
        var pipeCacheService = {
            add: function(paramWithURL) {
                var data =dataObject[JSON.stringify(paramWithURL)]; 
                if (!data) {
                    addKeyWithStatus(paramWithURL, PROMISE_STATUS.PENDING);
                }
            },
            get: function(paramWithURL) {
                var data = dataObject[JSON.stringify(paramWithURL)]; 
                doingPromise[JSON.stringify(paramWithURL)] = true;
                var index;
                if (data) {
                    if (data.status === PROMISE_STATUS.DONE) {
                        data.status = PROMISE_STATUS.INVALID;
                        delete doingPromise[JSON.stringify(paramWithURL)];
                        return data.data;
                    } else if(data.status === PROMISE_STATUS.WORKING) {
                        return data.promise;
                    } else {
                        return getData(paramWithURL);
                    }
                } else {
                    return getData(paramWithURL);
                }
            }
        }
        //Start service
        run();

        return pipeCacheService;
    }
    exports.PipeCacheService.$inject = ['service', '$http'];
})(angular.bplus = angular.bplus || {});