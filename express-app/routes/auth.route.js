const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController')
const userRegistValidator = require('../middleware/userRegistValidator');

router.get('/', authController.showLoginPage);
router.get('/register', authController.showRegisterPage);
router.post('/register', userRegistValidator, authController.registUser);


module.exports = router;
