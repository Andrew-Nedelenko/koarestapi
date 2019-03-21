const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User } = require('../model/Schema');
const { client } = require('../model/Store');

const userLogin = async (ctx) => {
  const { username, email, password } = ctx.request.body;
  const candidate = await User.findOne({
    where: {
      username,
      email,
    },
  });
  if (candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password);
    if (passwordResult) {
      const secret = `${email}${Math.random(10)}`;
      const hash = crypto.createHmac('sha256', secret)
        .update('I love cupcakes')
        .digest('hex');
      await client.setex(username, 24 * 60 * 60, hash);
      ctx.cookies.set('SID', hash, {
        signed: true, maxAge: 24 * 60 * 60 * 1000, path: '/',
      });
      ctx.cookies.set('usid', username, { signed: true, maxAge: 24 * 60 * 60 * 1000, path: '/' });
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.message = 'password not match';
    }
  } else {
    ctx.status = 404;
    ctx.message = 'wrong email';
  }
};


module.exports = {
  userLogin,
};
