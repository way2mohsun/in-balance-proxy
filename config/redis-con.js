require("dotenv").config();
var redis = require('redis');
process.env.LOG_CONF
var client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

client.on('connect', function () {
    console.log('connected to redis.');
});

module.exports = {
    redis_client: client,
};
