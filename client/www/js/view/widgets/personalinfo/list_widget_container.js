define([
    "when",
    "jquery",
    "angular",
    "bplus-ui/model/personalinfo"
], function (when, $, angular, personalinfoData) {
    var DATA_PATTERN = {
        "bplusawardall": {
            "id": "",
            "name": "",
            "organization": "",
            "prizeDate": {
                "value": {
                    "year": "",
                    "month": "",
                    "day": ""
                }
            },
            "description": "",
            "tags": ""
        },
        "bplusworkexperienceall": {
            "id": "",
            "name": "",
            "position": "",
            "industry": "",
            "dateFrom": {
                "value": {
                    "year": "",
                    "month": "",
                    "day": ""
                }
            },
            "dateTo": {
                "value": {
                    "year": "",
                    "month": "",
                    "day": ""
                },
                "tillNow": false
            },
            "description": "",
            "tags": ""
        },
        "bplusclubexperienceall": {
            "id": "",
            "name": "",
            "position": "",
            "dateFrom": {
                "value": {
                    "year": "",
                    "month": "",
                    "day": ""
                }
            },
            "dateTo": {
                "value": {
                    "year": "",
                    "month": "",
                    "day": ""
                },
                "tillNow": false
            },
            "description": "",
            "tags": ""
        },
        "bpluspersonalinfooverall": {
            "id": "",
            "name": "",
            "gender": "",
            "dateOfBirth": {
                "value": {
                    "year": {value: ""},
                    "month": {value: ""},
                    "day": {value: ""}
                },
                "isPrivate": false
            },
            "location": "",
            "contractInfo": {
                "value": "",
                "isPrivate": false
            }
        },
        "bplusskillsoverall": {
            "id": "",
            "name": "",
            "description": "",
            "tags": ""
        },
        "bpluseducationbackgroundall": {
            "id": "",
            "name": "",
            "major": "",
            "background": "",
            "dateFrom": {
                "year": "",
                "month": "",
                "day": ""
            },
            "dateTo": {
                "year": "",
                "month": "",
                "day": ""
            },
            "description": "",
            "tags": ""
        },
        "bpluslanguageall": {
          "id": "",
          "name": "",
          "proficiency": "",
          "certification": "",
          "score": ""
        }
    };

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
                            return model.getData(service, forceRefresh).then(function (data) {
                                scope.dataCollection = data;
                                scope.hasData = scope.dataCollection && scope.dataCollection.length > 0;
                                scope.$apply();
                            });
                        };
                        updateData();
                        scope.showAddButton = true;
                        scope.add = function () {
                            scope.dataCollection.push($.extend(true, {}, DATA_PATTERN[directiveName]));
                            scope.showAddButton = false;
                        };
                        scope.submit = function (data) {
                            scope.showAddButton = true;
                            return model.saveData(service, data).then(function() {
                              scope.showAddButton = true;
                              updateData();
                            }, function() {
                              scope.showAddButton = true;
                              //TODO
                              //ERROR HANDLING
                            });
                        };
                        scope.cancel = function (data) {
                            scope.showAddButton = true;
                            //TODO
                            //Known issue, will refresh all the status.
                            updateData();
                        };
                        scope.edit = function (data) {
                            scope.showAddButton = false;
                            // Don't need to do anything on this action
                        };
                    }
                };
            }]);
        return _instance;
    };

    _instance = _instance ? _instance : new ListWidgetContainer();
    return _instance;
});
