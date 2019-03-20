const bcrypt = require('bcryptjs');
const { User } = require('../model/Schema');

const addUser = async (ctx) => {
  const { username, email, password } = ctx.request.body;
  const errors = {};
  if (!String(username).trim()) {
    errors.username = 'username is require';
  }

  if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(email))) {
    errors.email = 'Email is not valid';
  }

  if (!String(password).trim()) {
    errors.password = 'password is required';
  }

  if (Object.keys(errors).length) {
    ctx.body = errors;
  } else {
    const salt = bcrypt.genSaltSync(10);
    const bPass = bcrypt.hashSync(password, salt);
    const candidate = await User.findOne({
      where: {
        username,
        email,
      },
    });
    if (candidate) {
      ctx.message = 'user already exist';
    } else {
      await User.create({
        username,
        email: email.toLowerCase(),
        password: bPass,
        date: Date.now(),
      });
      ctx.message = 'user created';
    }
  }
};

module.exports = {
  addUser,
};
