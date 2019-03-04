const Sequelize = require('sequelize');

const sequelize = new Sequelize('oskartestdb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  operatorsAliases: false,

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
//   date: Sequelize.DATE,
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
