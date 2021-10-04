const views = '../views/post/';
const isLoggedIn = require('../services/isLoggedIn');
const { validationResult } = require('express-validator');
const User = require('../models').User;
const Post = require('../models').Post;
const PostLike = require('../models').PostLike;

module.exports = {
  indexPosts: (req, res, next) => {
    const user = isLoggedIn(req.cookies.token);
    if (user) {
    const posts = Post.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          required: false,
        },
        {
          model: User,
          as: 'likes',
          required: false,
        },
      ],
    });
    posts
      .then((postsData) => {
        const data = {
          isLoggedIn: user ? true : false,
          userData: user ? user : null,
          pageTitle: '投稿一覧',
          posts: postsData,
          messages: null,
        };
        res.render(views + 'index.ejs', data);
      })
      .catch((error) => {
        const data = {
          isLoggedIn: user ? true : false,
          userData: user ? user : null,
          pageTitle: '投稿一覧',
          posts: null,
          messages: [error],
        };
        res.render(views + 'index.ejs', data);
      });
    } else {
      res.redirect('/');
    }
  },
  newPost: (req, res, next) => {
    const user = isLoggedIn(req.cookies.token);
    if (user) {
      const data = {
        isLoggedIn: true,
        pageTitle: '新規投稿',
        formMethod: 'POST',
        actionPath: '/createpost',
        userData: user,
        postData: null,
        btnText: '投稿',
        messages: null,
      };
      res.render(views + 'new.ejs', data);
    } else {
      res.redirect('/');
    }
  },
  createPost: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let messages = [];
      errors.errors.forEach((error) => {
        messages.push(error.msg);
      });
      const user = isLoggedIn(req.cookies.token);
      const data = {
        isLoggedIn: true,
        pageTitle: '新規投稿',
        formMethod: 'POST',
        actionPath: '/createpost',
        userData: user,
        btnText: '投稿',
        messages: messages,
      };
      res.render(views + 'new.ejs', data);
    } else {
      Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userid,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
        .then((post) => {
          res.redirect('/posts');
        })
        .catch((error) => {
          const user = isLoggedIn(req.cookies.token);
          const data = {
            isLoggedIn: true,
            pageTitle: '新規投稿',
            formMethod: 'POST',
            actionPath: '/createpost',
            userData: user,
            btnText: '投稿',
            messages: error.messages,
          };
          res.render(views + 'new.ejs', data);
        });
    }
  },
  editPost: (req, res, next) => {
    const user = isLoggedIn(req.cookies.token);
    if (user) {
      const post = Post.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: User,
            required: false,
          },
        ],
      });

      post
        .then((postData) => {
          const data = {
            isLoggedIn: true,
            pageTitle: '投稿の編集',
            actionPath: `/updatepost/${postData.id}`,
            formMethod: 'POST',
            userData: postData.User.id,
            postData: postData,
            btnText: '更新',
            messages: null,
          };
          res.render(views + 'edit.ejs', data);
        })
        .catch((error) => {
          const data = {
            isLoggedIn: user ? true : false,
            pageTitle: '投稿一覧',
            posts: null,
            messages: error,
          };
          res.render(views + 'index.ejs', data);
        });
    } else {
      res.redirect('/');
    }
  },
  updatePost: (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body.postid);
    if (!errors.isEmpty()) {
      let messages = [];
      errors.errors.forEach((error) => {
        messages.push(error.msg);
      });
      const user = isLoggedIn(req.cookies.token);
      const data = {
        isLoggedIn: true,
        pageTitle: '投稿の編集',
        actionPath: `/updatepost/${req.body.postid}`,
        formMethod: 'POST',
        userData: user.id,
        postData: {
          title: req.body.title,
          content: req.body.content,
          userId: req.params.userid,
        },
        btnText: '更新',
        messages: messages,
      };
      res.render(views + 'new.ejs', data);
    } else {
      const user = isLoggedIn(req.cookies.token);
      if (user) {
        const post = Post.update(
          {
            title: req.body.title,
            content: req.body.content,
            userId: req.params.userid,
          },
          {
            where: {
              id: req.body.postid,
            },
          }
        );

        post
          .then((post) => {
            res.redirect('/posts');
          })
          .catch((error) => {
            const user = isLoggedIn(req.cookies.token);
            const data = {
              isLoggedIn: true,
              pageTitle: '投稿の編集',
              actionPath: `/updatepost/${req.body.postid}`,
              formMethod: 'POST',
              userData: user.id,
              postData: {
                title: req.body.title,
                content: req.body.content,
                userId: req.params.userid,
              },
              btnText: '更新',
              messages: [error],
            };
            res.render(views + 'edit.ejs', data);
          });
      }
    }
  },
  deletePost: (req, res, next) => {},
  likePost: (req, res, next) => {
    const postLike = PostLike.findOne({
      where: {
        userId: req.body.userId,
        postId: req.body.postId,
      },
    });
    postLike.then((postlike) => {
      if (postlike) {
        // like削除
        const deletedPost = postlike.destroy();
        deletedPost.then((result) => {
          next();
        });
      } else {
        // like追加
        PostLike.create({
          userId: req.body.userId,
          postId: req.body.postId,
          createdAt: new Date(),
          updatedAt: new Date()
        }).then(postlike => {
          //
          next();
        });
      }
    })
  },
};
