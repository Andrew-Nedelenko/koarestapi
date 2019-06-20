const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname, '../');
dotenv.config({ path: root('.env') });

const evrt = {
  host: process.env.HOST,
  port: process.env.PORT,
  dbname: process.env.DBNAME,
  dbuser: process.env.DBUSER,
  dbpass: process.env.DBPASS,
  dbhost: process.env.DBHOST,
};

module.exports = { evrt };
