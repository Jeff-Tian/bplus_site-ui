define([
], function() {
  var ListWidgetBase = function() {
    Object.call(this);
    this.ENUM_STATUS = {
      STATUS_EDIT: "status.edit",
      STATUS_READONLY: "status.readonly"
    };
  };
  ListWidgetBase.prototype = Object.create(Object.prototype);
  ListWidgetBase.prototype.constructor = ListWidgetBase;
  
  return ListWidgetBase;
});
