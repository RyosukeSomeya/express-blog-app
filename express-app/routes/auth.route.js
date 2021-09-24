const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController')
const userRegistValidator = require('../middleware/userRegistValidator');
const passport = require('../services/auth'); // node moduleではなく、auth.jsファイル
const jwt = require('jsonwebtoken');

router.get('/', authController.showLoginPage);
router.post('/', passport.authenticate('local', { session: false, failWithError: true }),
(req, res) => {
    const user = req.user; // ログインに成功したら req.user にユーザー情報が格納される
    const token = jwt.sign(user.toJSON(), 'secret'); // JWT トークンを作成する
    res.json({ token });
},
(err, req, res, next) => {
  if (err || !req.user) {
    const errorMessage = '認証に失敗しました。'
    res.status(401).send(errorMessage);
  } else {
    next(err);
  }
});
router.get('/register', authController.showRegisterPage);
router.post('/register', userRegistValidator, authController.registUser);


module.exports = router;
