const router = require('./auth.route')
const postController = require('../controller/PostController');

router.get('/newpost', postController.newPost);
// 記事IDをパラメータとして取るようにする
router.get('/editpost', postController.editPost);

module.exports = router;
