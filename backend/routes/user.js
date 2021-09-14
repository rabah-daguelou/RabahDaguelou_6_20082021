const express = require('express');
const checkEmail=require('../middleware/checkEmail')
const checkPassword=require('../middleware/checkPassword');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', checkEmail, checkPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;




