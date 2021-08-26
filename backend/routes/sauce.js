const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth= require('../middleware/auth');
const multer= require ('../middleware/multer-config');

// Associer le controleur aux différentes routes


// Créer les routes sauces

router.post('/sauces', sauceCtrl.createSauce);
router.get('/sauces',  sauceCtrl.getAllSauce);
router.get('/sauces/:id',  sauceCtrl.getOneSauce);
router.put('/sauces/:id', sauceCtrl.modifySauce);
router.delete('/sauces/:id',  sauceCtrl.deleteSauce);
//router.post('/sauces/:id/like', sauceCtrl.creatLikeSauce);


// Exporter le router
module.exports = router;
