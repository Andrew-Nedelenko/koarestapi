const bcrypt = require('bcryptjs');
const { User } = require('../model/Schema');

const addUser = async (ctx) => {
  const { username, email, password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const bPass = bcrypt.hashSync(password, salt);
  const candidate = await User.findOne({
    where: {
      email,
    },
  });
  if (candidate) {
    ctx.status = 409;
    ctx.message = 'email already exist';
  } else {
    await User.create({
      username,
      email: email.toLowerCase(),
      password: bPass,
      date: Date.now(),
    });
    ctx.status = 201;
    ctx.message = 'user created';
  }
};

module.exports = {
  addUser,
};
