const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const { User } = require('../model/Schema');
const { client } = require('../model/Store');
const { getDateNow, CreateCipher } = require('../utils/getDate');

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
      const hash = CreateCipher(`${username}#${uuid()}`);
      await client.hmset(username, 'SID', hash, 'username', username, 'email', email, 'host', ctx.headers.host, 'userAgent', ctx.headers['user-agent'], 'LoginDate', getDateNow());
      await client.expire(username, 24 * 60 * 60);
      ctx.cookies.set('SID', hash, {
        signed: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        rolling: false,
        secure: false,
        httpOnly: true,
        resave: true,
        saveUninitialized: true,
      });

      ctx.status = 200;
      ctx.body = {
        login: 'login succesfuly',
        username,
        email,
      };
    } else {
      ctx.status = 404;
      ctx.message = 'password not match';
    }
  } else {
    ctx.status = 404;
    ctx.message = 'wrong username of email';
  }
};


module.exports = {
  userLogin,
};
