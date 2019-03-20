const asyncRedis = require('async-redis');

const client = asyncRedis.createClient();

client.on('error', () => {
  throw new Error();
});

module.exports = {
  client,
};
