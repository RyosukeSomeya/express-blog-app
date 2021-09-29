const router = require('./auth.route')
const postController = require('../controller/PostController');

router.get('/newpost', postController.newPost);
router.post('/createpost', postController.createPost);
// 記事IDをパラメータとして取るようにする
router.get('/editpost', postController.editPost);
router.put('/updatepost', postController.updatePost);
router.delete('/updatepost', postController.deletePost);

module.exports = router;
