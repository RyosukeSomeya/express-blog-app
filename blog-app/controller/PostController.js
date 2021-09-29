const views = '../views/post/';
const isLoggedIn = require('../services/isLoggedIn');
const User = require('../models').User;
const Post = require('../models').Post;
module.exports = {
  newPost: (req, res, next) => {
    const user = isLoggedIn(req.cookies.token);
    if (user) {
      const data = {
        isLoggedIn: true,
        pageTitle: '新規投稿',
        formMethod: 'POST',
        actionPath: '/createpost',
        userData: user,
        btnText: '投稿',
        messages: null
      }
      res.render(views + 'new.ejs', data);
    } else {
      res.redirect('/');
    }
  },
  createPost: (req, res, next) => {

  },
  editPost: (req, res, next) => {
    const user = isLoggedIn(req.cookies.token);
    if (user) {
      const data = {
        isLoggedIn: true,
        pageTitle: '投稿の編集',
        actionPath: '/editpost',
        formMethod: 'PUT',
        userData: user,
        btnText: '更新',
        messages: null
      }
      res.render(views + 'edit.ejs', data);
    } else {
      res.redirect('/');
    }
  },
  updatePost: (req, res, next) => {

  },
  deletePost: (req, res, next) => {

  },
}

