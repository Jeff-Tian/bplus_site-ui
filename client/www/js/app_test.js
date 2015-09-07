// TODO: initial scripts, to be integrated into JS framework
define(["domReady!", 
  "angular", 
  "bplus-ui/view/widgets/personalinfo/list_skills_widget",
  "bplus-ui/view/widgets/personalinfo/list_personalinfo_widget",
  "bplus-ui/view/widgets/personalinfo/list_educationbackground_widget",
  "bplus-ui/view/widgets/personalinfo/list_clubexperience_widget",
  "bplus-ui/view/widgets/personalinfo/list_workingexperience_widget",
  "bplus-ui/view/widgets/personalinfo/list_widget_container",
  "text!bplus-ui/view/widgets/personalinfo/list_personalinfo_container.html",
  "text!bplus-ui/view/widgets/personalinfo/list_skills_container.html",
  "text!bplus-ui/view/widgets/personalinfo/list_educationbackground_container.html",
  "text!bplus-ui/view/widgets/personalinfo/list_clubexperience_container.html",
  "text!bplus-ui/view/widgets/personalinfo/list_workingexperience_container.html",
  ], function(document, angular, skills, personalinfo, educationbackground, club, work,
    container, personalinfoContainerTemplate, skillsContainerTemplate, eduContainerTemplate, clubContainerTemplate, workContainerTemplate) {
  return {
    start: function() {
    var agModule = angular.module('testmodule', []);
//  var skillInstance = new skills();
//  skillInstance.start(agModule);
    var instance = new container();
    instance.start(agModule, "bpluspersonalinfooverall", personalinfoContainerTemplate);
    var instance1 = new container();
    instance1.start(agModule, "bplusskillsoverall", skillsContainerTemplate);
    var instance2 = new container();
    instance2.start(agModule, "bpluseducationbackgroundall", eduContainerTemplate);
    var instance3 = new container();
    instance3.start(agModule, "bplusclubexperienceall", clubContainerTemplate);
    var instance4 = new container();
    instance4.start(agModule, "bplusworkexperienceall", workContainerTemplate);
    
    var instancePersonalInfo = new personalinfo();
    instancePersonalInfo.start(agModule);
    var instanceSkills = new skills();
    instanceSkills.start(agModule);
    var instanceEdu = new educationbackground();
    instanceEdu.start(agModule);
    var instanceClub = new club();
    instanceClub.start(agModule);
    var instanceWork = new work();
    instanceWork.start(agModule);
//  var instance1 = new skills();
//  instance1.start(agModule);
    angular.bootstrap($("#listskills"), ['testmodule']);
    }
  }
});
