var router = require('express').Router();

function mapPath2Template(path) {
    router.get(path, function (req, res, next) {
        res.render('mobile' + path);
    });
}

router.get('/', function (req, res, next) {
    res.render('mobile/index');
});

router.get('/signin', function (req, res, next) {
    res.render('mobile/sign-in');
});

var mobileRoutes = [
    'index',
    'sign-in',
    'aboutus',
    'national',
    'reset-password',
    'reset-password-by-email',
    'personal-history',
    'bind-mobile',
    'bind-mobile-by-password',
    'menu',
    'profile'
];

mobileRoutes.map(function (r) {
    mapPath2Template('/' + r);
});

module.exports = router;