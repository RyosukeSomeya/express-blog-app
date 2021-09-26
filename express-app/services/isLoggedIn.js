const jwt = require('jsonwebtoken');

const isLoggedIn = (token) => {
  if (token !== "undefined") {
    const userData = jwt.verify(token, 'secret');
    return userData;
  } else {
    return null;
  }
}

module.exports = isLoggedIn;