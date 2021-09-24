const { check } = require('express-validator');

module.exports = [
  // バリデーション
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('名前を入力してください。'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('メールアドレスを入力してください。'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('パスワードを入力してください。')
    .isLength({ min:7 })
    .withMessage('パスワードは7文字以上で入力してください。'),
  check('confirmpassword')
    .not()
    .isEmpty()
    .withMessage('確認用パスワードを入力してください。'),
  check('password').custom((value, { req }) => {
    if(req.body.password === req.body.confirmpassword) {
      return true;
    }
  }).withMessage('確認用パスワードが一致しません'),
];
