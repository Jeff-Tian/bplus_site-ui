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
            options: {
                mangle: true,
                compress: true,
                beautify: false
                /*Sitemap*/
            },
            // TODO: Investigate why it doesn't work
            files: [{
                expand: true,
                cwd: '../<%= config.dist %>',
                src: 'js/**/*.js',
                dest: 'js'
            }]
        }
    };
};