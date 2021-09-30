const router = require('./auth.route')
const postController = require('../controller/PostController');
const postValidator = require('../middleware/postValidator');

router.get('/posts', postController.indexPosts);
router.get('/newpost', postController.newPost);
router.post('/createpost', postValidator, postController.createPost);
// 記事IDをパラメータとして取るようにする
router.get('/editpost/:id', postController.editPost);
router.post('/updatepost', postValidator, postController.updatePost);
router.delete('/updatepost', postController.deletePost);

module.exports = router;
