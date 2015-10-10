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
      "angular-translate": "angular-translate/angular-translate.min",
      'domReady': 'requirejs-domready/domReady',
      "semantic": "semantic-ui/dist/semantic",
      "translate-config": "../js/config/translate",
  },
  "shim": {
      'angular': {
          exports: 'angular'
      },
      "angular-route":{
        deps: ["angular"],
        exports:"angular-route"
      },
      "angular-translate": {
        deps: ["angular"]
      },
      'semantic': {
        deps: ["jquery"]
      }
  },
  "deps": ["require", "less","semantic", "angular-route", "angular-translate", "translate-config"],
  "callback": function(require, less) {
    require(["bplus-ui/app_test"], function(app) {
      app.start();
    });
  }
});