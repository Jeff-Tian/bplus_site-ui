if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
    module.exports = require('./config_dev.js');
} else if (process.env.NODE_ENV === 'prd') {
    if (!(process.env.RUN_FROM === 'local')) {
        module.exports = require('./config_prd.js');
    } else {
        module.exports = require('./config_dev.js');
    }
} else if (process.env.NODE_ENV === 'uat') {
    module.exports = require('./config_uat.js');
} else {
    module.exports = require('./config_prd.js');
}