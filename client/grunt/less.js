module.exports = function () {
    return {
        development: {
            files: {
                "<%= config.src %>css/mobile.css": "<%= config.src %>css/mobile/main.less",
                "<%= config.src %>css/pc-mobile.css": "<%= config.src %>css/mobile/pc-mobile.less",
                "<%= config.src %>css/main.css": "<%= config.src %>css/page/main.less",
                "<%= config.src %>css/slim.css": "<%= config.src %>css/page/slim.less",
                "<%= config.src %>css/hp.css": "<%= config.src %>css/page/hp/hp.less",
                "<%= config.src %>css/qa.css": "<%= config.src %>css/page/qa/qa.less",
                "<%= config.src %>css/corp.css": "<%= config.src %>css/corp/main.less"
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
                "<%= config.dist %>css/main.css": "<%= config.dist %>css/page/main.less",
                "<%= config.src %>css/slim.css": "<%= config.src %>css/page/slim.less",
                "<%= config.dist %>css/hp.css": "<%= config.dist %>css/page/hp/hp.less",
                "<%= config.dist %>css/qa.css": "<%= config.dist %>css/page/qa/qa.less",
                "<%= config.src %>css/corp.css": "<%= config.src %>css/corp/main.less"
            }
        }
    };
};