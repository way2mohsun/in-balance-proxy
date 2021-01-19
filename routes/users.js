var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var db = global.db;
  console.log("SELECT * from user where email = '" + req.query.name + "' ");
  db.serialize(function () {
    db.each("SELECT * from user where name =  ? ", [req.query.name], function (err, row) {
      if(err) {
        console.log(err);
      }
      console.log(row.id);
    });
  });
  db.close();
  res.send('respond with a resource');
});

module.exports = router;