const Router = require('koa-router');
const common = require('../controllers/common');


const router = new Router();


router.get('/', common.root);
router.get('/:id', common.findById);
router.post('/', common.addUser);

module.exports = router;
