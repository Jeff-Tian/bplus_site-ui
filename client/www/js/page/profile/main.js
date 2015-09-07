'use strict';

// TODO: integrated into JS framework
(function() {
    //$(document)
    //  .ready(function() {
    // fix header when passed
    $('.b-masthead')
        .visibility({
            once: false,
            onBottomPassed: function() {
                $('[data-action=fixedHeader]').transition('fade in');
            },
            onBottomPassedReverse: function() {
                $('[data-action=fixedHeader]').transition('fade out');
            }
    });

    // create sidebar and attach to menu open
    $('.ui.sidebar')
        .sidebar('attach events', '.toc.item');
    //  });

    // TODO: initial tabs, to be integrated into JS framework
    $('.menu .item')
        .tab();

    // TODO: initial carousel, to be integrated into JS framework
    $('[data-action=carousel]').owlCarousel({
        singleItem: true,
        lazyLoad: true,
        loop: true,
        autoPlay: true,
        autoplayTimeout: 10000,
        navigation: true,
        navigationText: ['<i class="angle left icon"></i>', '<i class="angle right icon"></i>'],
        afterInit: function() {
            console.log("carousel init");
        },
        afterMove: function() {
            console.log("carousel move");
        }
    });
})();

var require = {
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
        "angular": "angularjs/angular",
        "angular-route": "angular-route/angular-route",
        'domReady': 'requirejs-domready/domReady',
        "semantic": "semantic-ui/dist/semantic",
        "bplus-mock": "../mock"
    },
    "shim": {
        'angular': {
            exports: 'angular'
        },
        "angular-route":{
            deps: ["angular"],
            exports:"angular-route"
        },
        'semantic': {
            deps: ["jquery"]
        }
    },
    "deps": ["require", "less","semantic", "angular-route"],
    "callback": function(require, less) {
        require([
            "angular",

            "bplus-ui/page/profile/widget/banner/main",
            "bplus-ui/page/profile/widget/achievement/main",
            "bplus-ui/page/profile/widget/growing/main",

            "bplus-ui/view/widgets/personalinfo/list_skills_widget",
            "bplus-ui/view/widgets/personalinfo/list_personalinfo_widget",
            "bplus-ui/view/widgets/personalinfo/list_educationbackground_widget",
            "bplus-ui/view/widgets/personalinfo/list_clubexperience_widget",
            "bplus-ui/view/widgets/personalinfo/list_widget_container",
            "text!bplus-ui/view/widgets/personalinfo/list_personalinfo_container.html",
            "text!bplus-ui/view/widgets/personalinfo/list_skills_container.html",
            "text!bplus-ui/view/widgets/personalinfo/list_educationbackground_container.html",
            "text!bplus-ui/view/widgets/personalinfo/list_clubexperience_container.html"
        ], function(
            angular,

            banner,
            achievement,
            growing,

            skills,
            personalinfo,
            educationbackground,
            club,
            container,
            personalinfoContainerTemplate,
            skillsContainerTemplate,
            eduContainerTemplate,
            clubContainerTemplate
        ) {
            var documentMudule = angular.module('docModule', []);

            (function (agModule) {
                banner(agModule);
                achievement(agModule);
                growing(agModule);

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

                var instancePersonalInfo = new personalinfo();
                instancePersonalInfo.start(agModule);
                var instanceSkills = new skills();
                instanceSkills.start(agModule);
                var instanceEdu = new educationbackground();
                instanceEdu.start(agModule);
                var instanceClub = new club();
                instanceClub.start(agModule);
                //  var instance1 = new skills();
                //  instance1.start(agModule);
            })(documentMudule);

            angular.element(window.document).ready(function() {
                angular.bootstrap(window.document, ['docModule']);
            });
        })
    }
};