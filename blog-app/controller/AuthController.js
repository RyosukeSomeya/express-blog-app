const views = '../views/'
const { validationResult } = require('express-validator');
const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  showLoginPage: (req, res, next) => {
    let errorMessage = null
    const flash = req.flash('error');
    if (flash.length) {
      errorMessage = flash;
    }

    const data = {
      isRegister: false,
      isLoggedIn: false,
      pageTitle: 'Log in',
      btnText: "Log in",
      actionPath: '/',
      messages: errorMessage
    };
    res.render(views + 'index.ejs', data);
  },
  showRegisterPage: (req, res, next) => {
    const data = {
      isRegister: true,
      isLoggedIn: false,
      pageTitle: 'Register',
      btnText: 'Register',
      actionPath: '/register',
      messages: null
    };
    res.render(views + 'regist.ejs', data);
  },
  registUser: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 入力に不備がある際の処理
      let messages = [];
      errors.errors.forEach((error) => {
        messages.push(error.msg);
      });
      const data = {
        isRegister: true,
        isLoggedIn: false,
        pageTitle: 'Register',
        btnText: 'Register',
        actionPath: '/register',
        messages: messages
      };
      res.render(views + 'regist.ejs', data);
    } else {
      // 認証処理
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date()
      }).then(user => {
        const token = jwt.sign(user.toJSON(), 'secret'); // JWT トークンを作成する
        res.cookie('token', token, {
          maxAge: 900000,
        }).redirect('/home');
      }).catch(error => {
        const data = {
          isRegister: true,
          isLoggedIn: false,
          pageTitle: 'Register',
          btnText: 'Register',
          actionPath: '/register',
          actionPath: '/',
          messages: error.message
        };
        res.render(views + 'index.ejs', data);
      });
    }
  },
  loginUser: (req, res) => {
    const user = req.user; // ログインに成功したら req.user にユーザー情報が格納される
    const token = jwt.sign(user.toJSON(), 'secret'); // JWT トークンを作成する

    res.cookie('token', token, {
      maxAge: 900000,
    }).redirect('/home');
  },
  logoutUser: (req, res) => {
    req.logout();
    res.cookie('token');
    res.redirect('/');
  },
}

