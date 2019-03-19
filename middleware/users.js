const { client } = require('../model/Store');

const checkToken = async (ctx, next) => {
  const token = ctx.cookies.get('SID');
  const user = ctx.cookies.get('usid');
  if (token && user) {
    const value = await client.get(user);
    if (token === value) {
      return next();
    }
    ctx.status = 403;
    return 0;
  }
  ctx.status = 401;
  return 0;
};


module.exports = {
  checkToken,
};
