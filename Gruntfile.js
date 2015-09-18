// Import depends modules
var path = "./client/";
var configClean = require(path + 'grunt/clean.js');
var configCopy = require(path + 'grunt/copy.js');
var configLess = require(path + 'grunt/less.js');
var configImagemin = require(path + 'grunt/imagemin.js');
var configUglify = require(path + 'grunt/uglify.js');
var configJshint = require(path + 'grunt/jshint.js');
var configHtml2js = require(path + 'grunt/html2js.js');
var configWatch = require(path + 'grunt/watch.js');
var configStringreplace = require(path + 'grunt/stringreplace.js');
var configStart = require(path + 'grunt/start.js');

// Create grunt module
module.exports = function (grunt) {
    'use strict';

    grunt.file.preserveBOM = true;

    // Grunt configuration:
    grunt.initConfig({
        "pkg": grunt.file.readJSON('package.json'),
        "meta": {
            "banner": '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        "config": {
            "src": path + 'www/',
            "dist": path + 'dist/',
            "temp": path + 'temp/',
            "release": ''
        },
        "bumpup": {
            file: 'package.json'
        },
        "clean": configClean(),
        "copy": configCopy(),
        "less": configLess(),
        "imagemin": configImagemin(),
        "uglify": configUglify(),
        "jshint": configJshint(),
        "html2js": configHtml2js(),
        "string-replace": configStringreplace(),
        "watch": configWatch(),
        "nodemon": configStart(),
        'concurrent': {
            dev: [
                'less:development',
                'watch',
                'nodemon',
                'jshint',
            ],
            options: {
                logConcurrentOutput: true
            }
        },
    });

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Bumpup task
    //major: Will bump the major x.0.0 part of a version string.
    //minor: Will bump the minor 0.x.0 part of a version string.
    //patch: Will bump the patch 0.0.x part of a version string.
    //prerelease: Will bump the prerelease 0.0.0-x part of a version string.
    grunt.registerTask('version', function (type) {
        if (type != null && type != false) {
            grunt.task.run('bumpup:' + type);
        }
    });

    // Default task.
    grunt.registerTask('develop', [
        'nodemon'
    ]);

    // Default task.
    grunt.registerTask('default', [
        'concurrent'
    ]);

    // Copy to WEB
    grunt.registerTask('release', []);
};