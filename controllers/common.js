const { PredictArray } = require('../model/Schema');

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
  ctx.body = table;
};

const addUser = async (ctx) => {
  console.log(ctx.request.body);
  ctx.response.status = 200;
};

module.exports = {
  root, findById, addUser,
};
