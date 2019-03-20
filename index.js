const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const KeyGrip = require('keygrip');
const router = require('./routes/routes');


const app = new Koa();

app.keys = ['secret key', 'secret key'];
app.keys = new KeyGrip(['secret key', 'secret key'], 'sha256');

app.use(helmet())
  .use(cors())
  .use(bodyParser({
    enableTypes: ['json', 'form'],
    multipart: true,
    formidable: {
      maxFileSize: 32 * 1024 * 1024,
    },
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger());


const port = process.env.PORT || 2800;
module.exports = app.listen(port);
