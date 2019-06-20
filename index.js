const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const KeyGrip = require('keygrip');
const router = require('./routes/routes');
const { evrt: { host, port } } = require('./utils/config');


const app = new Koa();


app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  global.console.log(`\x1b[35m${ctx.method}\x1b[0m \x1b[36m${ctx.url}\x1b[0m - ${rt} - \x1b[35m${ctx.response.status}\x1b[0m - \x1b[33mhostOrigin\x1b[0m -> \x1b[36m${ctx.headers.origin}\x1b[0m \x1b[33muserAgent\x1b[0m -> \x1b[36m${ctx.headers['user-agent']}\x1b[0m \n\x1b[2mcookies: ${ctx.headers.cookie ? JSON.stringify(ctx.headers.cookie) : 'no cookies'}\x1b[0m`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.keys = ['secret key', 'secret key'];
app.keys = new KeyGrip(['secret key', 'secret key'], 'sha256');


app.use(cors({
  credentials: true,
}))
  .use(helmet())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());


module.exports = app.listen(port, host);
