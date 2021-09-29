const views = '../views/post/';
const isLoggedIn = require('../services/isLoggedIn');
const User = require('../models').User;
const Post = require('../models').Post;
module.exports = {
  newPost: (req, res, next) => {
    res.render(views + 'new.ejs');
  },
  createPost: (req, res, next) => {

  },
  editPost: (req, res, next) => {
    res.render(views + 'edit.ejs');
  },
  updatePost: (req, res, next) => {

  },
}

