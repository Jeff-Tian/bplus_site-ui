module.exports = function() {
    return {
        development: {
            options: {
                mangle: false,
                compress: false,
                beautify: true
                /*Sitemap*/
            },
            files: {
            }
        },
        production: {
            options: {
                mangle: true,
                compress: true,
                beautify: false
                /*Sitemap*/
            },
            files: {
            }
        }
    };
};