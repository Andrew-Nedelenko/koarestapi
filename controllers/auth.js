const bcrypt = require('bcryptjs');
const { User, sequelize } = require('../model/Schema');

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
    ctx.status = 201;
    ctx.message = 'user created';
  } else {
    ctx.status = 409;
    ctx.message = 'email already exist';
  }
};

module.exports = {
  addUser,
};
