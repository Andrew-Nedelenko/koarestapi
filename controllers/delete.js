const { User } = require('../model/Schema');

const userDelete = async (ctx) => {
  const { email } = ctx.request.body;
  const candidate = await User.findOne({
    where: {
      email,
    },
  });
  if (candidate) {
    await candidate.destroy();
    ctx.message = 'user has been removed...';
  } else {
    ctx.message = 'user not found';
  }
};

module.exports = {
  userDelete,
};
