const Router = require('koa-router');
const common = require('../controllers/common');
const auth = require('../controllers/auth');
const login = require('../controllers/login');


const router = new Router();


router.get('/', common.root);
router.get('/:id', common.findById);
router.post('/reg', auth.addUser);
router.post('/login', login.userLogin);

module.exports = router;
