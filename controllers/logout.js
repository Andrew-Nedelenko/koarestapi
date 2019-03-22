const { client } = require('../model/Store');
const { ReadCipher } = require('../utils/getDate');

const logout = async (ctx) => {
  const { username } = ctx.request.body;
  if (username === 'undefined' || username === '') {
    ctx.status = 403;
    return 0;
  }
  const sId = await client.hget(ReadCipher(ctx.cookies.get('SID')), 'username');
  if (sId) {
    await client.del(ReadCipher(ctx.cookies.get('SID')));
    ctx.status = 200;
    ctx.body = {
      message: 'you are login off',
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      message: 'user not found',
    };
  }
  return 0;
};

module.exports = logout;
