define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/model/modelbase",
  "json!bplus-mock/getEdu.json",
  "json!bplus-mock/getSkills.json",
  "json!bplus-mock/getPersonalInfo.json"
], function(when, $, angular, BaseClass, getEduMock, getSkillsMock, getPsersonalInfoMock) {
  
  var PersonalInfo = function() {
    var me = this;
    BaseClass.call(me);
    me.SERVICES = {
      "bpluspersonalinfooverall": "getPersonalInfo",
      "bplusskillsoverall": "getSkills",
      "bpluseducationbackgroundall": "getEdu",
    };
    me.rawdata = {};
    /////////////
    //TEST BEGIN
    me.rawdata = {
      "getEdu" : getEduMock,
      "getSkills": getSkillsMock,
      "getPersonalInfo": getPsersonalInfoMock 
    };
    //TEST END
    ///////
    me.SERVICENAME = "personalinfoService";
  }
  PersonalInfo.prototype = Object.create(BaseClass.prototype);
  PersonalInfo.prototype.constructor = PersonalInfo;

  return PersonalInfo;
});