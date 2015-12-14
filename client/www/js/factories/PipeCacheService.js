(function (exports) {
    var todoArray = [];
    var todoIndex = 0;
    var todoParam = null;
    var todoPromise = null;
    var externalParam = null;
    var doneArray = [];
    var doneDataArray = [];
    var executingPromise = null;
    var STATUS = {
        STOPPED: "stop",
        WORKING: "working",
        IDLE: "idle"
    }
    var status = STATUS.STOPPED;
    var KeyStructure = {
        url: "",
        params: ""
    }
    var status = null;
    exports.PipeCacheService = function (service, $http) {
        var createPromise = function(paramWithURL) {
            todoPromise = service.handleHttpPromise($http({
                url: paramWithURL.url,
                params: paramWithURL.params,
                method: "GET"
            }));
            return todoPromise;
        }
        var findNextPromise = function() {
            todoParam = todoArray[todoIndex++];
            var ret = null;
            if (todoParam) {
                ret = createPromise(nextParam);
            } else {
                todoParam = todoPromise = null;
            }
            return ret;
        };
        var promiseChain = function(promise) {
            if (promise) {
                return promise.then(function() {
                    return promiseChain(findNextPromise());
                })
            }
        };
        var idle = function() {

        };
        var run = function() {
            var currentParamObject = todoArray[todoIndex];
            if (currentParamObject) {
                status = STATUS.WORKING;
            } else {
                idle();
            }
        };
        var pipeCacheService = {
            add: function() {

            },
            get: function() {

            }
        }
        //Start service
        run();

        return pipeCacheService;
    }
    exports.PipeCacheService.$inject = ['service', '$http'];
})(angular.bplus = angular.bplus || {});