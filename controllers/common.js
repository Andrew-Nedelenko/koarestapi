const bcrypt = require('bcryptjs');
const { PredictArray, User, sequelize } = require('../model/Schema');

const root = async (ctx) => {
  const table = await PredictArray.findAll({
    limit: 1000,
  });
  ctx.body = table;
};

const findById = async (ctx) => {
  const table = await PredictArray.findOne({
    where: {
      id: ctx.params.id,
    },
  });
  ctx.body = table;
};

const addUser = async (ctx) => {
  const { username, email, password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const bPass = bcrypt.hashSync(password, salt);
  const candidate = await User.findOne({
    where: {
      email,
    },
  });
  if (!candidate) {
    await sequelize.sync();
    const data = await User.create({
      username,
      email: email.toLowerCase(),
      password: bPass,
      date: Date.now(),
    });
    console.log(data);
    ctx.status = 200;
  } else {
    ctx.status = 409;
  }
};

module.exports = {
  root, findById, addUser,
};
