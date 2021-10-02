const { check } = require('express-validator');

module.exports = [
  check('title')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('タイトルを入力してください。'),
  check('content')
    .not()
    .isEmpty()
    .withMessage('本文を入力してください。'),
  check('content')
    .isLength({ max:140 })
    .withMessage('投稿できる内容は140文字以内です。'),
];
