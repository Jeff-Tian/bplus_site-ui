module.exports = function () {
    return {
        development: {
            files: {
                "client/www/css/mobile.css": "client/www/css/mobile/main.less",
                "client/www/css/main.css": "client/www/css/page/main.less" // destination file and source file
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
                "<%= config.dist %>css/main.css": "<%= config.dist %>css/page/main.less" // destination file and source file
            }
        }
    };
};