const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./routes/routes');


const app = new Koa();


app.use(router.routes())
  .use(router.allowedMethods())
  .use(helmet())
  .use(cors())
  .use(bodyParser());


app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Responce-Time');
  global.console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Responce-Time', `${ms}ms`);
});


const port = process.env.PORT || 2800;
app.listen(port);
