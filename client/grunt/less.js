module.exports = function() {
    return {
        development: {
            options: {
                paths: []
            },
            files: {
            }
        },
        production: {
            options: {
                paths: [],
                compress: true
            },
            files: {
            }
        }
    };
};