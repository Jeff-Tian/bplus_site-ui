define([
], function() {
  var ListWidgetBase = function() {
    Object.call(this);
    this.ENUM_STATUS = {
      STATUS_EDIT: "status.edit",
      STATUS_READONLY: "status.readonly"
    };
    // Make it an object, so that easy to extend and avoid value paste
    this.property= {
      // Default status is readonly
      status: this.ENUM_STATUS.STATUS_READONLY
    };
    this.saveEdit = function() {
      //TODO
    };
    this.cancelEdit = function() {
      //TODO
    };
  };
  ListWidgetBase.prototype = Object.create(Object.prototype);
  ListWidgetBase.prototype.constructor = ListWidgetBase;
  
  ListWidgetBase.prototype.edit = function() {
    //Can be called from external actions
  }
  
  return ListWidgetBase;
});
