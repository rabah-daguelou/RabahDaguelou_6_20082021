// Router spécifique pour l'authentification

const express = require('express');
const router = express.Router();

// Associer le controleur aux différentes routes
const userCtrl = require('../controllers/user');

// Créer les routes utilisateurs
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;




