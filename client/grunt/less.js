module.exports = function () {
    return {
        development: {
            files: {
                "<%= config.src %>css/mobile.css": "<%= config.src %>css/mobile/main.less",
                "<%= config.src %>css/pc-mobile.css": "<%= config.src %>css/mobile/pc-mobile.less",
                "<%= config.src %>css/main.css": "<%= config.src %>css/page/main.less", // destination file and source file
                "<%= config.src %>css/hp.css": "<%= config.src %>css/page/hp/hp.less"
            }
        },
        production: {
            options: {
                compress: true,
                yuicompress: true,
                optimization: 2
            },
            files: {
                "<%= config.dist %>css/mobile.css": "<%= config.dist %>css/mobile/main.less",
                "<%= config.dist %>css/pc-mobile.css": "<%= config.dist %>css/mobile/pc-mobile.less",
                "<%= config.dist %>css/main.css": "<%= config.dist %>css/page/main.less", // destination file and source file
                "<%= config.dist %>css/hp.css": "<%= config.dist %>css/page/hp/hp.less"
            }
        }
    };
};