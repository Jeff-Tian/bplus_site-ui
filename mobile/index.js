var router = require('express').Router();

function mapPath2Template(path) {
    router.get(path, function (req, res, next) {
        res.render('mobile' + path);
    });
}

router.get('/', function (req, res, next) {
    res.render('mobile/index');
});

mapPath2Template('/index');
mapPath2Template('/sign-in');
router.get('/signin', function (req, res, next) {
    res.render('mobile/sign-in');
});
mapPath2Template('/reset-password');
mapPath2Template('/reset-password-by-email');
mapPath2Template('/personal-history');
mapPath2Template('/bind-mobile');
mapPath2Template('/bind-mobile-by-password');
mapPath2Template('/menu');

module.exports = router;