// Karma configuration
// Generated on Fri Sep 25 2015 11:54:38 GMT+0800 (CST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../bower/jquery/dist/jquery.js',
            '../bower/semantic-ui/dist/semantic.js',
            '../bower/angular/angular.js',
            '../bower/angular-translate/angular-translate.js',
            '../../../locales/*.js',
            '../js/config/*.js',
            '../js/utils/utils.js',
            '../js/utils/msgbus.js',
            '../js/factories/*.js',
            '../js/controllers/*.js',
            '../js/directives/*.js',
            '../js/page/register/*.js',
            '../js/page/account-setting/main.js',
            '../bower/angular-mocks/angular-mocks.js',
            './**/*tests.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}
