const { User } = require('../model/Schema');

const userProfile = async (ctx) => {
  const uid = ctx.cookies.get('usid');
  if (uid) {
    const candidate = await User.findOne({
      where: {
        username: uid,
      },
    });
    ctx.status = 200;
    ctx.body = candidate;
  }
  ctx.status = 403;
};

module.exports = {
  userProfile,
};
