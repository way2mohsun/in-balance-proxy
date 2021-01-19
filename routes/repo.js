var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

router.get('/', function (req, res, next) {});

router.post('/tasks', function (req, res, next) {
    var db = new sqlite3.Database(__dirname + '/../repo.db');
    db.serialize(function () {
        db.all("SELECT * FROM task",
            [],
            function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status(500);
                }
                res.send(rows);
            });
    });
    db.close();
});

router.post('/status', function (req, res, next) {
    var db = new sqlite3.Database(__dirname + '/../repo.db');
    db.serialize(function () {
        db.all("SELECT * FROM status",
            [],
            function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status(500);
                }
                res.send(rows);
            });
    });
    db.close();
});


router.post('/task-delete', function (req, res, next) {
    var db = new sqlite3.Database(__dirname + '/../repo.db');
    db.run('delete from task where id = ?', [req.body.id]);
    db.close();
    res.send();
});

router.post('/task-create', function (req, res, next) {
    var db = new sqlite3.Database(__dirname + '/../repo.db');
    db.run('INSERT INTO task (task, DESC) VALUES (?, ?)', [req.body.task, req.body.desc]);
    db.close();
    res.send();
});

router.post('/task-status', function (req, res, next) {
    console.log(req.body);
    var db = new sqlite3.Database(__dirname + '/../repo.db');
    db.run('INSERT INTO log (user,task,status,DESC) VALUES (?, ?, ?, ?)',
        [
            req.session.user_id,
            req.body.task,
            req.body.status,
            req.body.desc
        ]);
    db.close();
    res.send();
});

module.exports = router;