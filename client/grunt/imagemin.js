module.exports = function() {
    return {
        "dist-img": {
            files: [{
                expand: true,
                cwd: '<%= config.src %>images/',
                src: ['**/*.{png,jpg,gif}'],
                dest: '<%= config.dist %>images/'
            }]
        }
    }
};