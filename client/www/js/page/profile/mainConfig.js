require.config({
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
        "name": "bplus-ui",
        "location": "../js"
    }],
    "paths": {
        "text": "requirejs-plugins/lib/text",
        "image": "requirejs-plugins/src/image",
        "json": "requirejs-plugins/src/json",
        "propertyParser": "requirejs-plugins/src/propertyParser",
        "angular": "angular/angular",
        "angular-translate": "angular-translate/angular-translate.min",
        'domReady': 'requirejs-domready/domReady',
        "semantic": "semantic-ui/dist/semantic"
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
