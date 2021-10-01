const router = require('./auth.route');
const userController = require('../controller/UserController');

router.get('/home', userController.showMyPage);

module.exports = router;
