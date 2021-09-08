// Router spécifique pour l'authentification

const express = require('express');
const emailTest=require('../middleware/emailTest')
const passwordTest=require('../middleware/passwordTest');

const router = express.Router();

// Associer le controleur aux différentes routes
const userCtrl = require('../controllers/user');

// Créer les routes utilisateurs
router.post('/signup', emailTest, passwordTest, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;




