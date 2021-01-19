var express = require('express');
var router = express.Router();
// if admin then Uer management page will open else home page will be displayed
router.get('/', function (req, res, next) {
    res.set('content-type', 'text/html');
    res.render('home.html');
});

router.post('/', function (req, res, next) {
    res.redirect('/home');
});

module.exports = router;
