require("dotenv").config();
import express from "express";
import { redis_client } from '../config/redis-con'
var needle = require('needle');
var log = require('log4js').getLogger("in_request");
const router = express.Router();
var xml2js = require('xml2js');

router.all('/', function (req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', async function () {
        try {
            const
                {
                    Request: { msisdn: a_number },
                    Request: { bPartyDetails: { bPartyNumber: b_number } }
                } = await parse_body(data);
            let results = await send_3d_party(
                await db_result(a_number),
                await db_result(b_number));
            log.info(results.req, results.res);
            return res.status(200).send('Done');
        } catch (error) {
            log.error(error + ":" + data.replace(/\n/g, "").replace(/>\s+</g, ""));
            return res.status(400).send(error);
        }
    });
});


function parse_body(data) {
    return new Promise((resolve, reject) => {
        const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });
        parser.parseString(data, (error, result) => {
            if (error) return reject('XML format is wrong');
            resolve(result);
        });
    });
}

function db_result(data) {
    return new Promise((resolve, reject) => {
        redis_client.get(data, function (err, results) {
            if (err) return reject('Error on Redis.');
            if (results) return resolve(results);
            reject(data + ' : Record not found in redis');
        });
    });
}

let req_3d_req = process.env['3D_PARTY_REQ'];
let req_3d_url = process.env['3D_PARTY_URL'];
let req_3d_hed = process.env['3D_PARTY_HED'];

function send_3d_party(a_fake_number, b_fake_number) {
    return new Promise((resolve, reject) => {
        let data = JSON.parse(req_3d_req
            .replace('fake-id-a', a_fake_number)
            .replace('fake-id-b', b_fake_number));
        console.log(data)
        needle.post(req_3d_url, data, req_3d_hed, function (err, resp) {
            if (err) return reject('Error on calling 3d-party.');
            return resolve({ req: data, res: resp.body });
        });
    });
}

module.exports = router;