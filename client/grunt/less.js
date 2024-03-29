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

    //TODO: Don't ever run the following code on production!!! Otherwise some css won't
    //  be created and the site would look messy.
    // If you want to run the following code on your own machine only, please add an
    // environment variable. For example,
    // if(process.env.RUN_FROM === 'your_name') {
    //      ...
    // }
    //for (var i in files) {
    //    var ma = i.toString().toLowerCase().match(/\/(.*?)\.css$/);
    //    if (ma && (ma.length > 1)) {
    //        reObj[ma[1]] = {
    //            files: {}
    //        };
    //        reObj[ma[1]].files[i] = files[i];
    //    }
    //}

    return reObj;
};