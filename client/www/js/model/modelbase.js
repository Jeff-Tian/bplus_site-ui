define([
  "when",
  "jquery",
  "angular",
], function(when, $, angular) {
  
  var ModelBase = function() {
    var me = this;
    me.CONFIG = {};
    me.rawdata = {};
    me.SERVICENAME = "";
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
      this.getData = function(dataKey, dataParam) {
        var ajaxParam = $.extend({}, self.CONFIG[dataKey], true);
        var paramKey = "";
        if (dataParam) {
          ajaxParam.data = dataParam;
          paramKey = JSON.stringify(dataParam);
        } else {
          paramKey = "0";
        }
        return $.ajax(ajaxParam).then(function(data) {
          if (!self.rawdata[dataKey]) {
            self.rawdata[dataKey] = {};
          }
          self.rawdata[dataKey][paramKey] = data;
          return $.extend(true, [], data);
        });
      };
      this.getRawData = function(dataKey, dataParam) {
        var paramKey = dataParam ? JSON.stringify(dataParam) : "0";
        var retValue;
        if (self.rawdata[dataKey] && self.rawdata[dataKey][paramKey]) {
          retValue = when($.extend(true, [], self.rawdata[dataKey][paramKey]));
        } else {
          retValue = me.getData();
        }
        return retValue;
      };
      this.saveData = function(dataKey, dataParam) {
        //TODO
      };
    });
  };
  return ModelBase;
});