const views = '../views/users/';
const isLoggedIn = require('../services/isLoggedIn');

module.exports = {
  showMyPage: (req, res, next) => {
    const userData = isLoggedIn(req.cookies.token);
    if (userData) {
      const data = {
        isLoggedIn: true,
        pageTitle: 'UserHome',
        userData: userData
      };

      res.render(views + 'home.ejs', data);
    } else {
      res.redirect('/');
    }
  },
}

