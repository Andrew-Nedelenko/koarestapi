const Router = require('koa-router');
const common = require('../controllers/common');


const router = new Router();


router.get('/', common.root);

module.exports = router;
