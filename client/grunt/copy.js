module.exports = function () {
    return {
        main: {
            files: [
                {
                    expand: true,
                    cwd: "<%= config.src %>",
                    src: [
                        'api/**',
                        'bower/**',
                        'competion/**',
                        'css/**',
                        'icon/**',
                        'img/**',
                        'js/**',
                        'mobile/**',
                        'view-partial/**',
                        '*'
                    ],
                    dest: "<%= config.dist %>"
                },
                {
                    expand: true,
                    cwd: "./locales/",
                    src: ['localeHelper.js'],
                    dest: "<%= config.dist %>translation/"
                }
            ]
        }
    };
};