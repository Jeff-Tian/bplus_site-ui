module.exports = function () {
    return {
        main: {
            files: [
                {expand: true, cwd: "<%= config.src %>", src: ['**'], dest: "<%= config.dist %>"},
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