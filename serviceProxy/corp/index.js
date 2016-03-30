module.exports = require('express').Router()
    .use('/member', require('./member'))
    .use('/jobapply', require('./jobapply'))
    .use('/candidate', require('./candidate'))
    .use('/resource', require('./resource'))
    .use('/resources', require('./resources'))
    .use('/sms', require('./sms.js'))
;