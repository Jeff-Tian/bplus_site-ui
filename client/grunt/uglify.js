module.exports = function () {
    return {
        development: {
            options: {
                mangle: false,
                compress: false,
                beautify: true
                /*Sitemap*/
            },
            files: {}
        },
        production: {
            // TODO: Investigate why it doesn't work
            files: [{
                expand: true,
                cwd: '<%= config.dist %>js',
                src: '**/*.js',
                dest: '<%= config.dist %>js'
            }],
            options: {
                mangle: true
            }
        }
    };
};