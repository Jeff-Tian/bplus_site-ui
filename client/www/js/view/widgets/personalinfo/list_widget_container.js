define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/model/personalinfo",
], function(when, $, angular, personalinfoData) {
  var DATA_PATTERN = {
    "bpluspersonalinfooverall": {
      name: "",
      gender: "",
      dateOfBirth: {
        value: {
          year: {value: ""},
          month: {value: ""},
          day: {value: ""} 
        },
        isPrivate: false
      },
      location: "",
      contractInfo: {
        value: "",
        isPrivate: false
      }
    },
  };
  
  var ListWidgetContainer = function() {
    Object.call(this);
  };
  ListWidgetContainer.prototype = Object.create(Object.prototype);
  ListWidgetContainer.prototype.constructor = ListWidgetContainer;
  
  ListWidgetContainer.prototype.start = function(agModel, directiveName, template) {
    new personalinfoData().start(agModel);
    agModel
    .directive(directiveName, ["personalinfoService", function(model){
      return {
        restrict: 'E',
        template: template,
        link: function(scope, element) {
          var service = model.SERVICES.PERSONAL_INFO;
          var updateData = function(isLatestData) {
            var returnPromise;
            if (isLatestData) {
              returnPromise = model.getData(service);
            } else {
              returnPromise = model.getRawData(service);
            }
            return returnPromise.then(function(data){
              scope.dataCollection = data;
              scope.hasData = scope.dataCollection && scope.dataCollection.length > 0;
              scope.$apply();
            });
          }
          updateData();
          scope.add = function() {
            scope.dataCollection.push($.extend(true, {}, DATA_PATTERN[directiveName]));
          };
          scope.submit = function() {
            //TODO
            //Get data and save them
//          return model.saveData();
          };
          scope.cancel = function() {
            //TODO
            //Known issue, will refresh all the status.
            updateData();
          };
          scope.edit = function() {
            // Don't need to do anything on this action
          };
        }
      };
    }]);
  }
  
  return ListWidgetContainer;
});
