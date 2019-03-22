const { client } = require('../model/Store');
const { User } = require('../model/Schema');
const { ReadCipher } = require('../utils/getDate');

const userDelete = async (ctx) => {
  const { email } = ctx.request.body;
  const candidate = await User.findOne({
    where: {
      email,
    },
  });
  if (candidate) {
    await client.del(ReadCipher(ctx.cookies.get('SID')));
    await candidate.destroy();
    ctx.status = 200;
    ctx.body = {
      message: 'user has been removed...',
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'user not found',
    };
  }
};

module.exports = {
  userDelete,
};
