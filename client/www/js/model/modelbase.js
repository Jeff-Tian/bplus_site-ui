define([
  "when",
  "jquery",
  "angular",
], function(when, $, angular) {
  
  var ModelBase = function() {
    var me = this;
    me.rawData = {};
    me.PATTERN = {};
    me.SERVICES = {};
    me.SERVICENAME = "";
    me.getPattern = function(key) {
        return $.extend(true, {}, me.PATTERN[key]);
    };
  };
  ModelBase.prototype = Object.create(ModelBase);
  ModelBase.prototype.constructor = ModelBase;
  
  ModelBase.prototype.start = function(agModel) {
    var self = this;
    agModel.service(self.SERVICENAME, function($http, $q) {
      // Use when instead of $q because when provide something better
      // $.ajax itself is a promise A+ method. Just use it.
      // If $q need to be used, have to use $q.deffer() instead.
      var me = this;
      me.SERVICES = self.SERVICES;
      this.getData = function(dataKey, dataParam, forceUpdate) {
        var paramKey = dataParam ? JSON.stringify(dataParam) : "0";
        var retValue;
        if (!forceUpdate && self.rawData[dataKey] && self.rawData[dataKey][paramKey]) {
          retValue = when($.extend(true, [], self.rawData[dataKey][paramKey]));
        } else {
          retValue = self.getRawData(dataKey, dataParam, forceUpdate).then(function(parsedData) {
              if (!self.rawData[dataKey]) {
                self.rawData[dataKey] = {};
              }
              self.rawData[dataKey][paramKey] = parsedData;
              return $.extend(true, [], parsedData);
          });
        }
        return retValue;
      };
      this.saveData = function(dataKey, dataParam) {
        //TODO
        //Update local storage
        return when();
      };
      this.getPattern = function(key) {
          return self.getPattern(key);
      };
    });
  };
  return ModelBase;
});