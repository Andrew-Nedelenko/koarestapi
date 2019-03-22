const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const { User } = require('../model/Schema');
const { client } = require('../model/Store');
const { CreateCipher, ReadCipher, getDateNow } = require('../utils/getDate');

const userUpdate = async (ctx) => {
  const { email, username, password } = ctx.request.body;

  const candidate = await User.findOne({
    where: {
      email,
    },
  });
  const passwordResult = bcrypt.compareSync(password, candidate.password);
  if (passwordResult) {
    const changeUsername = await User.findAll({
      where: {
        username,
      },
    });
    if (changeUsername.length > 0) {
      ctx.status = 409;
      ctx.body = {
        message: 'user already exist, cant update',
      };
    } else {
      await client.del(ReadCipher(ctx.cookies.get('SID')), 'username');
      const newSid = CreateCipher(`${username}#${uuid()}`);
      await client.hmset(username, 'SID', newSid, 'username', username, 'email', email, 'host', ctx.headers.host, 'userAgent', ctx.headers['user-agent'], 'LoginDate', getDateNow());
      await client.expire(username, 24 * 60 * 60 * 10);
      await User.update({ username },
        {
          where: {
            email,
          },
        });
      ctx.cookies.set('SID', newSid, {
        signed: true, maxAge: 24 * 60 * 60 * 1000, path: '/',
      });
      ctx.status = 200;
      ctx.body = {
        message: 'username updated',
      };
    }
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'wrong data',
    };
  }
};

module.exports = {
  userUpdate,
};
