const Router = require('koa-router');
const common = require('../controllers/common');
const auth = require('../controllers/auth');
const login = require('../controllers/login');
const deleteUser = require('../controllers/delete');
const up = require('../controllers/update');
const { userProfile } = require('../controllers/profile');
const { checkToken } = require('../middleware/users');

const router = new Router();


router.get('/', checkToken, common.root);
router.get('/films/:id', checkToken, common.findById);
router.get('/users', checkToken, common.getUsers);
router.get('/profile/:id', userProfile);
router.post('/reg', auth.addUser);
router.post('/login', login.userLogin);
router.put('/update/username', checkToken, up.userUpdate);
router.delete('/del', checkToken, deleteUser.userDelete);

module.exports = router;
