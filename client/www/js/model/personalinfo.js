define([
  "when",
  "jquery",
  "angular",
  "bplus-ui/model/modelbase"
], function(when, $, angular, BaseClass) {
  
  var PersonalInfo = function() {
    var me = this;
    BaseClass.call(me);
    me.CONFIG = {
     "getPersonalInfo": {
        "url": "",
        "method": ""
      },
     "getSkills": {
        "url": "",
        "method": ""
      },
    };
    me.SERVICES = {
      "bpluspersonalinfooverall": "getPersonalInfo",
      "bplusskillsoverall": "getSkills",
    };
    me.rawdata = {};
    /////////////
    //TEST BEGIN
    me.rawdata = {
      "getSkills": {
        "0": [
          {
            name: "Cook",
            description: "I love eating",
            tags: "eat food"
          },
          {
            name: "Music",
            description: "I love music",
            tags: "classic newAge"
          }
        ]
      },
      "getPersonalInfo": {
        "0": [
          {
            name: "Hello, world",
            gender: "男",
            dateOfBirth: {
              value: {
                year: {value: "1949"},
                month: {value: "10"},
                day: {value: "1"}
              },
              isPrivate: false
            },
            location: "Shanghai",
            contractInfo: {
              value: "Huangpu",
              isPrivate: false
            }
          },
          {
            name: "Hello, world 2",
            gender: "女",
            dateOfBirth: {
              value: {
                year: {value: "2015"},
                month: {value: "9"},
                day: {value: "1"}
              },
              isPrivate: false
            },
            location: "Beijing",
            contractInfo: {
              value: "Sihuan",
              isPrivate: false
            }
          }
        ]
      }
    };
//  me.rawdata = {
//    "getPersonalInfo": {
//      "0": []
//    }
//  };
    //TEST END
    ///////
    me.SERVICENAME = "personalinfoService";
  }
  PersonalInfo.prototype = Object.create(BaseClass.prototype);
  PersonalInfo.prototype.constructor = PersonalInfo;

  return PersonalInfo;
});