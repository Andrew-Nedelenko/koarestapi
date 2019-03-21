const { client } = require('../model/Store');
const { User } = require('../model/Schema');

const userProfile = async (ctx) => {
  const hash = ctx.cookies.get('SID');
  const username = await client.hget(hash, 'username');
  if (username && hash) {
    const candidate = await User.findOne({
      where: {
        username,
      },
    });
    ctx.status = 200;
    ctx.body = candidate;
  }
  ctx.status = 403;
};

module.exports = {
  userProfile,
};
