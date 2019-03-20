const { User } = require('../model/Schema');

const userProfile = async (ctx) => {
  const { id } = ctx.params;
  console.log(ctx.params.id);
  const candidate = await User.findOne({
    where: {
      id,
    },
  });
  ctx.body = candidate;
};

module.exports = {
  userProfile,
};
