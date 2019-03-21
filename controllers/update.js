const bcrypt = require('bcryptjs');
const { User } = require('../model/Schema');
const { client } = require('../model/Store');

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
      const sesId = await client.get(candidate.username);
      await client.setex(candidate.username, 24 * 60 * 60, sesId);
      await User.update({ username },
        {
          where: {
            email,
          },
        });
      ctx.cookies.set('SID', sesId, {
        signed: true, maxAge: 24 * 60 * 60 * 1000, path: '/',
      });
      ctx.cookies.set('usid', username, { signed: true, maxAge: 24 * 60 * 60 * 1000, path: '/' });
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
