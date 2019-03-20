const { client } = require('../model/Store');

const logout = async (ctx) => {
  const { username } = ctx.request.body;
  await client.del(username);
  ctx.body = {
    message: 'you are login off',
  };
};

module.exports = logout;
