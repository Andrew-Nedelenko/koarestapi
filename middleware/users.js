const { client } = require('../model/Store');
const { ReadCipher } = require('../utils/getDate');

const checkToken = async (ctx, next) => {
  const token = ctx.cookies.get('SID');
  if (token) {
    const value = await client.hget(ReadCipher(token), 'SID');
    if (token === value) {
      return next();
    }
    ctx.status = 401;
    return 0;
  }
  ctx.status = 401;
  return 0;
};


module.exports = {
  checkToken,
};
