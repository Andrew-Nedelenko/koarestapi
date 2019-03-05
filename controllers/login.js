const bcrypt = require('bcryptjs');
const { User } = require('../model/Schema');

const userLogin = async (ctx) => {
  const { email, password } = ctx.request.body;
  const candidate = await User.findOne({
    where: {
      email,
    },
  });
  if (candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password);
    if (passwordResult) {
      ctx.status = 200;
      ctx.message = 'succes login';
    } else {
      ctx.status = 404;
      ctx.message = 'password not match';
    }
  } else {
    ctx.status = 404;
    ctx.message = 'email doesnt exist';
  }
};

module.exports = {
  userLogin,
};
