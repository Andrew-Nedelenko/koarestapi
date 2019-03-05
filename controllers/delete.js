const { User } = require('../model/Schema');

const userDelete = async (ctx) => {
  console.log(ctx.request.body);
  const { email } = ctx.request.body;
  const candidate = await User.findOne({
    where: {
      email,
    },
  });
  if (candidate) {
    await candidate.destroy();
    ctx.status = 200;
    ctx.message = 'user has been removed...';
  } else {
    ctx.status = 404;
    ctx.message = 'user not found';
  }
};

module.exports = {
  userDelete,
};
