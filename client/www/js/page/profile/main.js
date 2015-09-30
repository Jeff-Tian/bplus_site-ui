require.config({
    "context": "bplus",
    "waitSeconds": 0,
    "baseUrl": "bower",
    "packages": [{
        "name": "jquery",
        "location": "jquery/dist",
        "main": "jquery"
    }, {
        "name": "when",
        "location": "when",
        "main": "when"
    }, {
        "name": "less",
        "location": "less/dist",
        "main": "less"
    }, {
        "name": "bplus-ui",
        "location": "../js"
    }],
    "paths": {
        "text": "requirejs-plugins/lib/text",
        "image": "requirejs-plugins/src/image",
        "json": "requirejs-plugins/src/json",
        "propertyParser": "requirejs-plugins/src/propertyParser",
        "angular": "angular/angular",
        "angular-route": "angular-route/angular-route",
        'domReady': 'requirejs-domready/domReady',
        "semantic": "semantic-ui/dist/semantic",
        "bplus-mock": "../mock"
    },
    "shim": {
        'angular': {
            exports: 'angular'
        },
        "angular-route": {
            deps: ["angular"],
            exports: "angular-route"
        },
        'semantic': {
            deps: ["jquery"]
        }
    }
});

require.config({"context": "bplus"})([
    "require",
    "less",
    "semantic",
    "angular-route"
], function (pRequire,
             less,
             semantic,
             agRoute) {
    pRequire([
        "angular",

        "bplus-ui/page/profile/widget/banner/main",
        "bplus-ui/page/profile/widget/achievement/main",
        "bplus-ui/page/profile/widget/growing/main",

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
    ], function (angular,
                 banner,
                 achievement,
                 growing,
                 Date,
                 Tag,
                 Skills,
                 Personalinfo,
                 Educationbackground,
                 Club,
                 Work,
                 Award,
                 Language,
                 Container,
                 personalinfoContainerTemplate,
                 skillsContainerTemplate,
                 eduContainerTemplate,
                 clubContainerTemplate,
                 workContainerTemplate,
                 awardContainerTemplate,
                 languageContainerTemplate) {
        var documentMudule = angular.module('docModule', ['pascalprecht.translate', 'ng.utils'])
                .controller('AppCtrl', angular.bplus.AppCtrl)
                .factory('FormValidation', angular.bplus.FormValidation)
                .factory('service', angular.bplus.service)
                .factory('MessageStore', angular.bplus.MessageStore)
            ;
        (function (agModule) {
            banner(agModule);
            achievement(agModule);
            growing(agModule);

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
                new Personalinfo(),
                new Skills(),
                new Educationbackground(),
                new Club(),
                new Work(),
                new Award(),
                new Language()
            ];

            listWidgets.forEach(function (value) {
                value.start(agModule);
            });
        })(documentMudule);

        angular.element(window.document).ready(function () {
            angular.bootstrap(window.document, ['docModule']);
        });
    });
});