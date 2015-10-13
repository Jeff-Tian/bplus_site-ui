require.config({
    "waitSeconds": 0,
    "baseUrl": "bower",
    "packages": [{
        "name": "jquery",
        "location": "jquery/dist",
        "main": "jquery.min"
    }, {
        "name": "when",
        "location": "when",
        "main": "when"
    }, {
        "name": "bplus-ui",
        "location": "../js"
    }],
    "paths": {
        "text": "requirejs-plugins/lib/text",
        "image": "requirejs-plugins/src/image",
        "json": "requirejs-plugins/src/json",
        "propertyParser": "requirejs-plugins/src/propertyParser",
        'domReady': 'requirejs-domready/domReady',
        "angular": "angular/angular.min",
        "angular-translate": "angular-translate/angular-translate.min",
        "semantic": "semantic-ui/dist/semantic.min"
    },
    "shim": {
        'angular': {
            exports: 'angular'
        },
        "angular-translate": {
            deps: ["angular"],
            exports: "angular-translate"
        },
        'semantic': {
            deps: ["jquery"]
        }
    }
});
