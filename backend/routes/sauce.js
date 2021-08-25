const express = require('express');
const router = express.Router();

const auth= require('../middleware/auth');
//const multer= require ('../middleware/multer-config');

// Associer le controleur aux différentes routes
const sauceCtrl = require('../controllers/sauce');

// Créer les routes sauces

router.post('/sauces', auth, sauceCtrl.createSauce);
router.get('/sauces', auth, sauceCtrl.getAllSauce);
router.get('/sauces/:id', auth, sauceCtrl.getOneSauce);
router.put('/sauces/:id', auth, sauceCtrl.modifySauce);
router.delete('/sauces/:id', auth, sauceCtrl.deleteSauce);
//router.post('/sauces/:id/like', sauceCtrl.creatLikeSauce);


// Exporter le router
module.exports = router;
