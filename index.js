const Koa = require('koa'),
app = new Koa(),
router = require('./routes/routes')
helmet = require('koa-helmet'),
cors = require('@koa/cors'),
bodyParser = require('koa-bodyparser');

app.use(router.routes())
.use(router.allowedMethods())
.use(helmet())
.use(cors())
.use(bodyParser())


app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Responce-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})
 app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Responce-Time', `${ms}ms`)
})




app.listen(2002)