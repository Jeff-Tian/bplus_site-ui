module.exports = function () {
    var files = {
            "<%= config.src %>css/mobile.css": "<%= config.src %>css/mobile/main.less",
            "<%= config.src %>css/pc-mobile.css": "<%= config.src %>css/mobile/pc-mobile.less",
            "<%= config.src %>css/main.css": "<%= config.src %>css/page/main.less",
            "<%= config.src %>css/slim.css": "<%= config.src %>css/page/slim.less",
            "<%= config.src %>css/hp.css": "<%= config.src %>css/page/hp/hp.less",
            "<%= config.src %>css/qa.css": "<%= config.src %>css/page/qa/qa.less",
            "<%= config.src %>css/corp.css": "<%= config.src %>css/corp/main.less",
            "<%= config.src %>css/module/form.css": "<%= config.src %>css/module/form.less"
        },
        reObj = {
            development: {
                files: files
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: files
            }
        };

    for (var i in files) {
        var ma = i.toString().toLowerCase().match(/\/(.*?)\.css$/);
        if (ma && (ma.length > 1)) {
            reObj[ma[1]] = {
                files: {}
            };
            reObj[ma[1]].files[i] = files[i];
        }
    }

    return reObj;
};