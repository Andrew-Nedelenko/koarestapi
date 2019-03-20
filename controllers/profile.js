const { User } = require('../model/Schema');

const userProfile = async (ctx) => {
  const uid = ctx.cookies.get('usid');
  const candidate = await User.findOne({
    where: {
      username: uid,
    },
  });
  ctx.body = candidate;
};

module.exports = {
  userProfile,
};
