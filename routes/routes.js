const Router = require('koa-router'),
router = new Router();
const {root, forbidden} = require('./route')

router.get('/', root)
router.get('*', forbidden)

module.exports = router