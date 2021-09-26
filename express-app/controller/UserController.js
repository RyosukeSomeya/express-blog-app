const views = '../views/users/';
const isLoggedIn = require('../services/isLoggedIn');

module.exports = {
  showMyPage: (req, res, next) => {
    const token = req.cookies.token;
    let userData;

    if (token === undefined || token === null) {
      res.redirect('/');
    }

    if (token !== null && token !== 'undefined') {
      userData = isLoggedIn(req.cookies.token);
    }

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

