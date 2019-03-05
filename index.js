const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./routes/routes');


const app = new Koa();


app.use(helmet())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger());


const port = process.env.PORT || 2800;
module.exports = app.listen(port);
