import express from "express";
//import { set_in_log_config, in_log } from '../config/log'
var log = require('log4js').getLogger("in_request");
const router = express.Router();
var parseString = require('xml2js').parseString;



router.get('/', function (req, res, next) {
    return res.status(200).send('Call Post Request.');
});

router.post('/', function (req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
        parseString(data, function (err, result) {
            if (err) {
                log.error(data.replace(/\n/g, "").replace(/>\s+</g, ""));
                return res.status(400).send('XML data is wrong');
            }
            log.info(result.Request.msisdn[0] + ':' + result.Request.bPartyDetails[0].bPartyNumber[0]);
            return res.status(200).send(result);
        });
    });
});



module.exports = router;