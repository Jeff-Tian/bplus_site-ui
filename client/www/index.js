require.config({
  "waitSeconds": 0,
  "baseUrl": "bower",
  "packages": [{
    "name": "jquery",
    "location": "jquery/dist",
    "main": "jquery"
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
      "angular": "angularjs/angular.min",
      "semantic": "semantic-ui/dist/semantic"
  },
  "shim": {
      'angular': {
          exports: 'angular'
      },
      'semantic': {
        deps: ["jquery"]
      }
  },
  "deps": ["require", "less", "angular", "semantic"],
  "callback": function(require, less, angular) {
    require(["bplus-ui/app"], function(app) {
      app.start();
    })
  }
});