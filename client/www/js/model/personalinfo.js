define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/model/modelbase",
  "json!bplus-ui/model/profileData/education.json",
  "json!bplus-ui/model/profileData/skill.json",
  "json!bplus-ui/model/profileData/memberExt.json",
  "json!bplus-ui/model/profileData/communityExperience.json",
  "json!bplus-ui/model/profileData/workExperience.json",
  "json!bplus-ui/model/profileData/archivement.json",
  "json!bplus-ui/model/profileData/languageSkill.json"
], function(when, $, angular, BaseClass, education, skill, memberExt, communityExperience, workExperience, archivement, languageSkill) {
  
  var _getDataPromise;
  var _data;
  
  var parseData = function(dataArray, pattern) {
      var targetArray = [];
      dataArray = $.isArray(dataArray) ? dataArray : [dataArray];
      dataArray.forEach(function(data) {
          for (var i in data) {
              var value = data[i];
              var keyArray = i.split(".");
              var firstKey = keyArray[0];
              var secondKey = keyArray[1];
              var isDate = firstKey.indexOf("date") > -1 && secondKey === "value";
              if (isDate) {
                  var targetObject = secondKey ? pattern[firstKey][secondKey] : pattern[firstKey];
                  if (value) {
                      var dateValue = new Date(value);
                      targetObject.year = dateValue.getFullYear();
                      targetObject.month = dateValue.getMonth() + 1;
                      targetObject.day = dateValue.getDay();
                  } else if (targetObject.hasOwnProperty("tillNow")){
                      targetObject.tillNow = true;
                  }
              } else if (value){
                  if (secondKey) {
                      pattern[firstKey][secondKey] = value;
                  } else {
                      pattern[firstKey] = value;
                  }
              }
          }
          targetArray.push(pattern);
      });
      return targetArray;
  };
  
  var PersonalInfo = function() {
    var me = this;
    BaseClass.call(me);

    me.SERVICENAME = "personalinfoService";

    var ajaxParam = {
        url: "/service-proxy/member/bplus-profile-all",
        type: "get",
        dataType: "json"
    };
    
    me.PATTERN = {
      "education" : education,
      "skill": skill,
      "memberExt": memberExt,
      "communityExperience": communityExperience,
      "workExperience": workExperience,
      "archivement": archivement,
      "languageSkill": languageSkill
    };
    me.SERVICES = {
      "bpluspersonalinfooverall": "memberExt",
      "bplusskillsoverall": "skill",
      "bpluseducationbackgroundall": "education",
      "bplusclubexperienceall": "communityExperience",
      "bplusworkexperienceall": "workExperience",
      "bplusawardall": "archivement",
      "bpluslanguageall": "languageSkill"
    };
    me.REOURCE = {
        //Language
        "certification": "englishlevel",
        "proficiency": "langguageproficiency",
        "name": "language",
        //Edu
        "background": "qualifications",
        //Community
        "position": "communityposition",
        //Work
        "type": "worktype",
        "industry": "industry",
        "position": "job"
    };
    me.rawdata = {};
    me.getRawData = function(dataKey, dataParam, forceUpdate) {
        if (forceUpdate || !_data) {
            if (!_getDataPromise) {
                _getDataPromise = $.ajax(ajaxParam);
            }
            return _getDataPromise.then(function(data) {
                if (data && data.isSuccess) {
                    if (!_data) {
                        _data = data.result;
                    }
                    return parseData(_data[dataKey], me.getPattern(dataKey)); 
                } else {
                    return when.reject("bplus-profile-all fails!");
                }
            });
        } else {
            return parseData(_data[dataKey], me.getPattern(dataKey)); 
        }
    };
    me.updateData = function(dataKey, dataParam){
        return when();
    };
    me.deleteData = function(dataKey, dataParam) {
        
    };
  };
  
  PersonalInfo.prototype = Object.create(BaseClass.prototype);
  PersonalInfo.prototype.constructor = PersonalInfo;

  return PersonalInfo;
  return {};
});