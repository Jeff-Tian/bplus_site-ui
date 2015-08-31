// TODO: initial scripts, to be integrated into JS framework
define(["domReady!", "angular", "bplus-ui/view/widgets/personalinfo/list_skills_widget"], function(document, angular, skills) {
  return {
    start: function() {
    var agModule = angular.module('testmodule', []);
    var skillInstance = new skills();
    skillInstance.start(agModule);
    angular.bootstrap($("#listskills"), ['testmodule']);
    }
  }
});
