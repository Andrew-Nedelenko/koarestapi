const { client } = require('../model/Store');
const { User } = require('../model/Schema');
const { ReadCipher } = require('../utils/getDate');

const userProfile = async (ctx) => {
  const hash = ctx.cookies.get('SID');
  const username = await client.hget(ReadCipher(hash), 'username');
  if (username && hash) {
    const candidate = await User.findOne({
      where: {
        username,
      },
    });
    ctx.status = 200;
    ctx.body = candidate;
  } else {
    ctx.status = 403;
  }
};

module.exports = {
  userProfile,
};
