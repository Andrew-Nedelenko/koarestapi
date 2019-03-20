const bcrypt = require('bcryptjs');
const { User } = require('../model/Schema');

const addUser = async (ctx) => {
  const { username, email, password } = ctx.request.body;
  const errors = {};
  if (!String(username).trim()) {
    errors.username = 'username is require';
  } else {
    const candidate = await User.findOne({
      where: {
        username,
      },
    });
    if (candidate) {
      errors.username = 'user already exist';
    }
  }

  if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(email))) {
    errors.email = 'Email is not valid';
  } else {
    const emailCandidate = await User.findOne({
      where: {
        email,
      },
    });
    if (emailCandidate) {
      errors.username = 'email already exist';
    }
  }

  if (!String(password).trim()) {
    errors.password = 'password is required';
  }

  if (Object.keys(errors).length) {
    ctx.body = errors;
  } else {
    const salt = bcrypt.genSaltSync(10);
    const bPass = bcrypt.hashSync(password, salt);
    await User.create({
      username,
      email: email.toLowerCase(),
      password: bPass,
      date: Date.now(),
    });
    ctx.message = 'user created';
  }
};

module.exports = {
  addUser,
};
