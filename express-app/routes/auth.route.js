const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController')
const userRegistValidator = require('../middleware/userRegistValidator');
const passport = require('../services/auth'); // node moduleではなく、auth.jsファイル
const jwt = require('jsonwebtoken');

router.get('/', authController.showLoginPage);
router.post('/', passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: true,
  badRequestMessage: '「メールアドレス」と「パスワード」は必須入力です。'
}), authController.loginUser);
router.get('/register', authController.showRegisterPage);
router.post('/register', userRegistValidator, authController.registUser);


module.exports = router;
