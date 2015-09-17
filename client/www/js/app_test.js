// TODO: initial scripts, to be integrated into JS framework
define(["domReady!",
    "angular",
    "bplus-ui/view/widgets/common/date",
    "bplus-ui/view/widgets/common/tag",
    "bplus-ui/view/widgets/personalinfo/list_skills_widget",
    "bplus-ui/view/widgets/personalinfo/list_personalinfo_widget",
    "bplus-ui/view/widgets/personalinfo/list_educationbackground_widget",
    "bplus-ui/view/widgets/personalinfo/list_clubexperience_widget",
    "bplus-ui/view/widgets/personalinfo/list_workingexperience_widget",
    "bplus-ui/view/widgets/personalinfo/list_award_widget",
    "bplus-ui/view/widgets/personalinfo/list_language_widget",
    "bplus-ui/view/widgets/personalinfo/list_widget_container",
    "text!bplus-ui/view/widgets/personalinfo/list_personalinfo_container.html",
    "text!bplus-ui/view/widgets/personalinfo/list_skills_container.html",
    "text!bplus-ui/view/widgets/personalinfo/list_educationbackground_container.html",
    "text!bplus-ui/view/widgets/personalinfo/list_clubexperience_container.html",
    "text!bplus-ui/view/widgets/personalinfo/list_workingexperience_container.html",
    "text!bplus-ui/view/widgets/personalinfo/list_award_container.html",
    "text!bplus-ui/view/widgets/personalinfo/list_language_container.html"
], function (document, angular, Date, Tag, Skills, PersonalInfo, EducationBackground, Club, Work, Award, Language,
             Container, personalinfoContainerTemplate, skillsContainerTemplate, eduContainerTemplate, clubContainerTemplate, workContainerTemplate, awardContainerTemplate, languageContainerTemplate) {
    return {
        start: function () {
            var agModule = angular.module('listSkillsModule', []);
            var instance = Container;
            instance.start(agModule, "bpluspersonalinfooverall", personalinfoContainerTemplate)
                .start(agModule, "bplusskillsoverall", skillsContainerTemplate)
                .start(agModule, "bpluseducationbackgroundall", eduContainerTemplate)
                .start(agModule, "bplusclubexperienceall", clubContainerTemplate)
                .start(agModule, "bplusworkexperienceall", workContainerTemplate)
                .start(agModule, "bplusawardall", awardContainerTemplate)
                .start(agModule, "bpluslanguageall", languageContainerTemplate);

            new Date().start(agModule);
            new Tag().start(agModule);

            var listWidgets = [
                new PersonalInfo(),
                new Skills(),
                new EducationBackground(),
                new Club(),
                new Work(),
                new Award(),
                new Language()
            ];

            listWidgets.forEach(function (value) {
                value.start(agModule);
            });

            angular.bootstrap($("#listskills"), ['listSkillsModule']);
        }
    };
});
