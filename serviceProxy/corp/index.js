module.exports = require('express').Router()
    .use('/member', require('./member'))
    .use('/jobapply', require('./jobapply'))
    .use('/resource', require('./resource'))
;