var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    if (req.session.user_id) {
        res.redirect('/home');
        return;
    }
    res.status(500);
    res.set('content-type', 'text/html');
    res.render('login.html');
});

router.post('/', function (req, res, next) {
    if (req.session.user_id) {
        res.send();
        return;
    }
    if (typeof req.body.user === "undefined" ||
        typeof req.body.password === "undefined" ||
        req.body.user === '' ||
        req.body.password === '') {
        res.status(500);
        res.send();
        return;
    }
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(__dirname + '/../repo.db');
    db.serialize(function () {
        db.each("SELECT count(*) as cnt,id from user where user =  ? and pass = ? ",
            [req.body.user, req.body.password],
            function (err, row) {
                if (err) {
                    console.log(err);
                    res.status(500);
                }
                if (row.cnt !== 0) {
                    req.session.user_id = row.id;
                    res.status(200);
                } else {
                    res.status(500);
                }
                res.send();
            });
    });
    db.close();
});

router.get('/logout', function (req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/');
        return;
    }
    var id = req.session.user_id;
    delete req.session.user_id;
    var dir = __dirname + '/../sessions/';
    fs.readdir(dir, 'utf8', function (err, files) {
        for (var i in files) {
            if (files[i].search(" ") > 0) {
                continue;
            }
            if (files[i].search(/json$/i) < 0) {
                continue;
            }
            content = fs.readFileSync(dir + files[i], 'utf8');
            if (content.search(id) > 0) {
                fs.unlink(dir + files[i], (err) => {});
            }
        }
    });
    res.redirect('/');
});

module.exports = router;