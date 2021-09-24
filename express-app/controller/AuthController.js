const views = '../views/'
const { validationResult } = require('express-validator');

module.exports = {
  showLoginPage: (req, res, next) => {
    const data = {
      isRegister: false,
      isLoggedIn: false,
      pageTitle: 'Log in',
      btnText: "Log in",
      actionPath: '/'
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

      const data = {
        isLoggedIn: true,
        userName: req.body.name,
        pageTitle: 'User Home',
      }
      res.render('users/home', data);
    }
  },
}
