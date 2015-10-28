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
var prdConfig = require('./config/config_prd.js');

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
            options: {
                dateformat: 'YYYYMMDD_HHmm',
                normalize: false
            },
            files: ['package.json', 'config/config_dev.json', 'config/config_prd.json']
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
                'replace',
                'watch',
                'nodemon',
                'jshint',
            ],
            prd: [
                'less:production',
                'jshint'
            ],
            options: {
                logConcurrentOutput: true
            }
        },
        "useref": {
            html: ['<%= config.dist %>*.html', '<%= config.dist %>view-partial/*.html', '<%= config.dist %>mobile/*.html'],
            temp: '<%= config.dist %>'
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    // Sometimes, the whitespaces are meaningful
                    collapseWhitespace: false
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.dist %>',
                        src: '*.html',
                        dest: '<%= config.dist %>'
                    }, {
                        expand: true,
                        cwd: '<%= config.dist %>',
                        src: 'view-partial/*.html',
                        dest: '<%= config.dist %>'
                    }]
            }
        },

        ngtemplates: {
            bplus: {
                options: {
                    prefix: '/'
                },
                cwd: '<%= config.dist %>',
                src: 'view-partial/register-form.html',
                dest: '<%= config.dist %>js/bplus/templates.js'
            },
            accountSetting: {
                options: {
                    prefix: '/'
                },
                cwd: '<%= config.dist %>',
                src: 'view-partial/register-form.html',
                dest: '<%= config.dist %>js/acountSetting/templates.js'
            },
            signIn: {
                options: {
                    prefix: '/'
                },
                cwd: '<%= config.dist %>',
                src: 'view-partial/register-form.html',
                dest: '<%= config.dist %>js/signIn/templates.js'
            },
            resetPassword: {
                options: {
                    prefix: '/'
                },
                cwd: '<%= config.dist %>',
                src: 'view-partial/register-form.html',
                dest: '<%= config.dist %>js/resetPassword/templates.js'
            }
        },

        concat: {
            production: {
                files: {
                    '<%= config.dist %>js/page/homepage/main.js': ['<%= config.dist %>js/page/homepage/main.js', '<%= ngtemplates.bplus.dest %>'],
                    '<%= config.dist %>js/page/account-setting/main.js': ['<%= config.dist %>js/page/account-setting/main.js', '<%= ngtemplates.accountSetting.dest %>'],
                    '<%= config.dist %>js/page/register/main.js': ['<%= config.dist %>js/page/register/main.js', '<%= ngtemplates.signIn.dest %>'],
                    '<%= config.dist %>js/page/reset-password/main.js': ['<%= config.dist %>js/page/reset-password/main.js', '<%= ngtemplates.resetPassword.dest %>']
                }
            }
        },

        cdnify: {
            dist: {
                options: {
                    rewriter: function (url) {
                        grunt.log.writeln(url);
                        if (url.indexOf('data:') === 0) {
                            return url; // leave data URIs untouched
                        } else if (url.indexOf('js/cdn') >= 0) {
                            if (url[0] === '/') {
                                url = url.substr(1);
                            }

                            var pack = grunt.file.readJSON('package.json');

                            if (process.env.NODE_ENV === 'prd') {
                                return prdConfig.cdn.normal + url + '?' + pack.version + '_' + pack.date;
                            }
                            if (process.env.NODE_ENV === 'qa') {
                                return 'qa-' + prdConfig.cdn.normal + url + '?' + pack.version + '_' + pack.date;
                            } else {
                                return url + '?cdnified';
                            }
                        } else if (url.indexOf('profile/main-build.js') > -1 || url.indexOf('profile/mobile-main-build.js') > -1) {
                            // For requirejs
                            url = url.replace('main-build.js', 'main.js');
                            return url;
                        } else {
                            return url; // add query string to all other URLs
                        }
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: 'view-partial/*.html',
                    dest: '<%= config.dist %>'
                }, {
                    // TODO: Must be true, why?
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '*.html',
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: 'mobile/*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        requirejs: {
            desktop: {
                options: {
                    baseUrl: "<%= config.dist %>bower",
                    mainConfigFile: "<%= config.dist %>/js/page/profile/mainConfig.js",
                    name: "bplus-ui/page/profile/main-build",
                    findNestedDependencies: true,
                    uglify: {
                        no_mangle: true
                    },
                    out: "<%= config.dist %>/js/page/profile/main.js"
                }
            },
            mobile: {
                options: {
                    baseUrl: "<%= config.dist %>bower",
                    mainConfigFile: "<%= config.dist %>/js/page/profile/mobile-mainConfig.js",
                    name: "bplus-ui/page/profile/mobile-main-build",
                    findNestedDependencies: true,
                    uglify: {
                        no_mangle: true
                    },
                    out: "<%= config.dist %>/js/page/profile/mobile-main.js"
                }
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: /https:\/\/fonts.googleapis.com\/css/g,
                        replacement: function () {
                            return 'http://fonts.useso.com/css'; // replaces "foo" to "bar" 
                        }
                    }]
                },
                files: [{
                    expand: true,
                    src: ['client/www/bower/semantic-ui/dist/semantic.min.css'],
                }]
            }
        }

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

    grunt.registerTask('devtest', [
        'replace'
    ]);

    // Default task.
    grunt.registerTask('default', [
        'concurrent'
    ]);

    grunt.registerTask('ng', ['ngtemplates', 'concat']);

    // Copy to WEB
    grunt.registerTask('release', ['bumpup', 'build']);
    grunt.registerTask('local-release', ['mock-release', 'build', 'nodemon']);
    grunt.registerTask('run-release', ['mock-release', 'nodemon']);
    grunt.registerTask('mock-release', function () {
        process.env.NODE_ENV = 'prd';
    });

    grunt.registerTask('build', ['clean:dist', 'replace', 'copy', 'inlineTranslation', 'less:production', 'useref', 'ngtemplates', 'concat', 'uglify:production', 'htmlmin', 'requirejs', 'cdnify' /*, 'cssmin'*/]);

    var KarmaServer = require('karma').Server;
    grunt.registerTask('ct', 'Client tests', function () {
        new KarmaServer({
            configFile: __dirname + '/client/www/test/my.conf.js',
            singleRun: true
        }).start();
    });

    grunt.registerTask('inlineTranslation', 'Inline Translation', function () {
        var fs = require('fs');
        var translateSource = '/client/www/js/factories/translationLoader.js';
        var translateFile = '/client/dist/js/factories/translationLoader.js';
        var translateFileContent = fs.readFileSync(__dirname + translateSource, 'utf-8').toString();

        var locales = fs.readdirSync(__dirname + '/locales');
        var data = {};
        for (var i = 0; i < locales.length; i++) {
            if (locales[i].indexOf('.json') >= 0) {
                var locale = locales[i].substr(0, locales[i].indexOf('.json'));

                data[locale] = JSON.parse(fs.readFileSync(__dirname + '/locales/' + locales[i], 'utf-8'));
            }
        }
        translateFileContent = translateFileContent.replace('var data = {};', 'var data = ' + JSON.stringify(data) + ';');

        //console.log(translateFileContent);
        fs.writeFileSync(__dirname + translateFile, translateFileContent, 'utf-8');
    });
};