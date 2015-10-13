define([
    "when",
    "jquery",
    "angular",
    "bplus-ui/model/personalinfo"
], function (when, $, angular, personalinfoData) {
    var _modelInstance;
    var _instance;

    var ListWidgetContainer = function () {
        Object.call(this);
    };
    ListWidgetContainer.prototype = Object.create(Object.prototype);
    ListWidgetContainer.prototype.constructor = ListWidgetContainer;

    ListWidgetContainer.prototype.start = function (agModel, directiveName, template) {
        if (!_modelInstance) {
            _modelInstance = new personalinfoData();
            _modelInstance.start(agModel);
        }
        agModel
            .directive(directiveName, ["personalinfoService", function (model) {
                return {
                    restrict: 'E',
                    template: template,
                    scope: {},
                    link: function (scope, element) {
                        var service = model.SERVICES[directiveName];
                        var updateData = function (forceRefresh) {
                            var returnPromise;
                            return model.getData(service, null, forceRefresh).then(function (data) {
                                scope.dataCollection = data;
                                scope.dataLoaded = true;
                                scope.hasData = scope.dataCollection && scope.dataCollection.length > 0;
                                scope.$apply();
                            });
                        };
                        updateData();
                        scope.showAddButton = true;
                        scope.add = function () {
                            scope.dataCollection.push(model.getPattern(service));
                            scope.showAddButton = false;
                        };
                        scope.submit = function (data) {
                            return model.updateData(service, data).then(function() {
                              scope.showAddButton = true;
                              return updateData(true);
                            }, function() {
                              scope.showAddButton = true;
                              return updateData();
                            });
                        };
                        scope.cancel = function (data) {
                            scope.showAddButton = true;
                            updateData();
                        };
                        scope.edit = function (data) {
                            scope.showAddButton = false;
                            // Don't need to do anything on this action
                        };
                        scope.del = function (data) {
                            return model.deleteData(service, data).then(function() {
                                scope.showAddButton = true;
                                return updateData(true);
                            });
                        };
                        scope.getResouce = function (key) {
                            return model.getResource(key);
                        };
                    }
                };
            }]);
        return _instance;
    };

    _instance = _instance ? _instance : new ListWidgetContainer();
    return _instance;
});