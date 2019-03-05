const { User } = require('../model/Schema');

const userUpdate = async (ctx) => {
  const { email, username } = ctx.request.body;
  const candidate = await User.update({ username },
    {
      where: {
        email,
      },
    });
  if (candidate) {
    ctx.status = 200;
    ctx.message = 'username updated';
  } else {
    ctx.status = 404;
  }
};

module.exports = {
  userUpdate,
};
