define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/model/modelbase",
  "json!bplus-mock/getEdu.json",
  "json!bplus-mock/getSkills.json",
  "json!bplus-mock/getPersonalInfo.json",
  "json!bplus-mock/getClub.json",
  "json!bplus-mock/getWork.json",
  "json!bplus-mock/getAward.json",
  "json!bplus-mock/getLanguage.json"
], function(when, $, angular, BaseClass, getEduMock, getSkillsMock, getPsersonalInfoMock, getClubMock, getWork, getAward, getLanguage) {
  
  var PersonalInfo = function() {
    var me = this;
    BaseClass.call(me);
    me.SERVICES = {
      "bpluspersonalinfooverall": "getPersonalInfo",
      "bplusskillsoverall": "getSkills",
      "bpluseducationbackgroundall": "getEdu",
      "bplusclubexperienceall": "getClub",
      "bplusworkexperienceall": "getWork",
      "bplusawardall": "getAward",
      "bpluslanguageall": "getLanguage",
    };
    me.rawdata = {};
    /////////////
    //TEST BEGIN
    me.rawdata = {
      "getEdu" : getEduMock,
      "getSkills": getSkillsMock,
      "getPersonalInfo": getPsersonalInfoMock,
      "getClub": getClubMock,
      "getWork": getWork,
      "getAward": getAward,
      "getLanguage": getLanguage,
    };
    //TEST END
    ///////
    me.parseData = function(data) {
      
    };
    me.SERVICENAME = "personalinfoService";
  }
  PersonalInfo.prototype = Object.create(BaseClass.prototype);
  PersonalInfo.prototype.constructor = PersonalInfo;

  return PersonalInfo;
});