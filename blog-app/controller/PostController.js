const views = '../views/post/';
const isLoggedIn = require('../services/isLoggedIn');

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

