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
                        'mock/major.en.json',
                        'mock/major.zh.json',
                        'profile-achievement.json',
                        'profile-growing.json',
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