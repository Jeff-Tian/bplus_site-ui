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
      'domReady': 'requirejs-domready/domReady',
      "semantic": "semantic-ui/dist/semantic"
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
    require(["bplus-ui/app_test"], function(app) {
      app.start();
    })
  }
});