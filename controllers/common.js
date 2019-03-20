const { PredictArray, User } = require('../model/Schema');

const root = async (ctx) => {
  const table = await PredictArray.findAll({
    limit: 1000,
  });
  ctx.body = table;
};

const findById = async (ctx) => {
  const table = await PredictArray.findOne({
    where: {
      id: ctx.params.id,
    },
  });
  if (table) {
    ctx.body = table;
  } else {
    ctx.message = 'not found...';
  }
};

const getUsers = async (ctx) => {
  const users = await User.findAll({
    limit: 200,
  });
  ctx.body = users;
};


module.exports = {
  root, findById, getUsers,
};
