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


module.exports = {
  root, findById,
};
