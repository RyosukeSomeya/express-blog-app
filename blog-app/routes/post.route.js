const router = require('./auth.route');
const postController = require('../controller/PostController');
const postValidator = require('../middleware/postValidator');

router.get('/posts', postController.indexPosts);
router.get('/newpost', postController.newPost);
router.post('/createpost', postValidator, postController.createPost);
router.get('/editpost/:id', postController.editPost);
router.put('/updatepost/:id', postValidator, postController.updatePost);

module.exports = router;
