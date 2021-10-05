const PostLike = require('../models').PostLike;

const getPostLikes = (userId, postId) => {
  const likes = PostLike.findOne({
    where: {
      userId: userId,
      postId: postId,
    },
  });
  return likes;
}

module.exports = getPostLikes;
