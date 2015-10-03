var router = require('express').Router();

function mapPath2Template(path) {
    router.get(path, function (req, res, next) {
        res.render('mobile' + path);
    });
}

mapPath2Template('/sign-in');
mapPath2Template('/reset-password');
mapPath2Template('/reset-password-by-email');
mapPath2Template('/personal-history');

module.exports = router;