var router = require('express').Router();


router.get('/my', function (req, res, next) {
    res.render('layout.jade', {
        title: 'test',
        message: 'test again'
    });
});

module.exports = router;