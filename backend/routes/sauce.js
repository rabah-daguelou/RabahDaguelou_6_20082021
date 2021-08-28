//const bodyParser=require('body-parser');
const express = require('express');
//const app = require('../app');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth= require('../middleware/auth');
const multer= require ('../middleware/multer-config');


// Associer le controleur aux différentes routes


// Créer les routes sauces

router.post('/sauces', multer, sauceCtrl.createSauce);
router.get('/sauces', sauceCtrl.getAllSauce);
router.get('/sauces/:id', sauceCtrl.getOneSauce);
router.put('/sauces/:id', multer, sauceCtrl.modifySauce);
router.delete('/sauces/:id', sauceCtrl.deleteSauce);
//router.post('/sauces/:id/like', sauceCtrl.creatLikeSauce);


//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

// Exporter le router
module.exports = router;
