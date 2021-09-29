const views = '../views/post/';
const isLoggedIn = require('../services/isLoggedIn');
const { validationResult } = require('express-validator');
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
        messages: messages
      };
      res.render(views + 'new.ejs', data);
    } else {
      Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userid,
        createdAt: new Date(),
        updatedAt: new Date()
      }).then(post => {
        console.log('投稿完了')
        res.redirect('/home');
      }).catch(error => {
        const user = isLoggedIn(req.cookies.token);
        const data = {
          isLoggedIn: true,
          pageTitle: '新規投稿',
          formMethod: 'POST',
          actionPath: '/createpost',
          userData: user,
          btnText: '投稿',
          messages: error.messages
        };
        res.render(views + 'new.ejs', data);
      });
    }
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

