const { client } = require('../model/Store');

const logout = async (ctx) => {
  const { username } = ctx.request.body;
  if (username === 'undefined' || username === '') {
    ctx.status = 403;
    return 0;
  }
  const candidate = await client.del(username);
  if (candidate) {
    ctx.body = {
      message: 'you are login off',
    };
  } else {
    ctx.message = 'user not found';
  }
  return 0;
};

module.exports = logout;
