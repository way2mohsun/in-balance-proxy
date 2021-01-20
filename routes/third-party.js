import express from "express";
const router = express.Router();

router.post('/', function (req, res, next) {
    res.send('3d party received.');
});

module.exports = router;