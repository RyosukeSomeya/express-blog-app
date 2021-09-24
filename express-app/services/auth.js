const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // ID+パスワード認証を使用
const User = require('../models').User;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    // DBからメールアドレスでユーザを取得
    User.findOne({
        where: {
            email: email
        }
    })
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            return done(null, user); // ログイン成功時
        }
        throw new Error();
    })
    .catch(error => {
        return done(null, false, { message: 'パスワードが違います' });
    })
}));

// session
// ユーザーをシリアライズしてセッションに埋め込む
passport.serializeUser((user, done) => {
    done(null, user);
});
// リクエストを受け取った時ユーザー特定する
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
