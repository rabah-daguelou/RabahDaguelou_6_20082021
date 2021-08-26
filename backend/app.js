const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose= require('mongoose');

// Accéder au path du serveur
const path=require('path');

// Importer les routers user et sauce
const userRoutes=require('./routes/user');
const sauceRoutes=require('./routes/sauce');

//Connecter l'API à la base de donnée MongoDB
mongoose.connect('mongodb+srv://rabah-daguelou:Rd-2311-1974@peckoko.yjtim.mongodb.net/peckoko?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Implémentation de headers
// Le middleware s'appliquera à toutes les routes
app.use((req, res, next) => {

    // Accéder à l'api depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter des headers aux requettes envoyées vers l'api
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer des requêtes ( GET, POST,...)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
// fin headers

// Définir la fonction json comme middleware global/ // Déprécié !!!!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/auth', userRoutes);
app.use('/api', sauceRoutes);

module.exports=app;
