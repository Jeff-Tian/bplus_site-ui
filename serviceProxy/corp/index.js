var membership = require('../membership');

module.exports = require('express').Router()
    .use('/member', require('./member'))
    .use('/jobapply', membership.ensureAuthenticated, require('./jobapply'))
    .use('/candidate', membership.ensureAuthenticated, require('./candidate'))
    .use('/resource', membership.ensureAuthenticated, require('./resource'))
    .use('/job', membership.ensureAuthenticated, require('./job'))
    .use('/resources', membership.ensureAuthenticated, require('./resources'))
    .use('/sms', require('./sms.js'))
;