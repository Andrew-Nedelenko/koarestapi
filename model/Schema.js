const Sequelize = require('sequelize');
const {
  evrt: {
    dbname, dbuser, dbpass, dbhost,
  },
} = require('../utils/config');

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
  host: dbhost,
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const User = sequelize.define('oskaruserdata', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  date: Sequelize.DATE,
});

const PredictArray = sequelize.define('oskarpredict', {
  key: Sequelize.STRING,
  title: Sequelize.STRING,
  movie: Sequelize.STRING,
  director: Sequelize.STRING,
  count: Sequelize.NUMERIC,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize, PredictArray, User,
};
