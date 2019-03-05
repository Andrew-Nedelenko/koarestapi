const Router = require('koa-router');
const common = require('../controllers/common');
const auth = require('../controllers/auth');
const login = require('../controllers/login');
const deleteUser = require('../controllers/delete');
const up = require('../controllers/update');

const router = new Router();


router.get('/', common.root);
router.get('/films/:id', common.findById);
router.get('/users', common.getUsers);
router.post('/reg', auth.addUser);
router.post('/login', login.userLogin);
router.put('/update/username', up.userUpdate);
router.delete('/del', deleteUser.userDelete);

module.exports = router;
