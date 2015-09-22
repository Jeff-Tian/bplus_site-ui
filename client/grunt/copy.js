module.exports = function () {
    return {
        main: {
            files: [
                {expand: true, cwd: "<%= config.src %>", src: ['**'], dest: "<%= config.dist %>"}
            ]
        }
    };
};