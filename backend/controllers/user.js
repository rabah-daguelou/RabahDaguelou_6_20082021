// Importer bcrypt
const bcrypt=require('bcrypt');

// Importer jsonwebtoken/ 
// Package pour créer des token et de les vérifier
const jwt=require('jsonwebtoken');

const User=require('../models/User');

// Hacher le mot de passe avec une fonction asynchrone
 // Récupérer le hash du mot de passe 
   // Enregistrer le nouveau mot de passe dans un nouveau user dans la base de donnée

   // Middleware 1: Avec la fonction signup. 
   // Enregistrer les utilisateurs
   exports.signup = (req, res, next) => {
  
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
         email: req.body.email,
         //Stocker le mot de passe haché
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

// Connecter les utilisateurs existants dans la BDD

// Middleware 2: Connecter les utilisateurs
exports.login = (req, res, next) => {

  // trouver l'utilisateur qui correspond à l'adresse email saisie
  User.findOne({ email:req.body.email})
    
  // Fonction asynchrone qui renvoie une promise
  .then(user => {
    // Renvoyer une erreur si l'utilisateur n'existe pas
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur introuvable!' });
    }
    // Renvoyer une erreur si le mot de passe est incorrect
    // Utiliser bcrypt pour comparer le mot de passe envoyé par l'utilisateur
    // avec le hach enregistré dans la bdd via le user reçu
    bcrypt.compare(req.body.password, user.password)
      // Fonction asynchrone qui renvoie une promise
      // Réception d'un booléen
      .then(valid => {
        //False
        if (!valid) {
          return res.status(401).json({ error: 'Ce mot de passe est incorrect !' });
        }
        
        // True
        // Renvoyer (selon le frontend) un objet json contenant user._id et token
        res.status(200).json({
          
          userId: user._id,
          // fonction sign de jwt avec arguments
          
          token: jwt.sign(
            // argument 1: (payload) données à encoder
            // userId
                  
          { userId:user._id},
            // argument 2: La clé secrète de l'encodage
            'RANDOM_TOKEN_SECRET',
            
           
            // Argument 3: Expiration du token: Configuration de session
            // Chaque token durera 24h- au-délà, il n'esst plus valable
            {expiresIn:'72h'}
          )         
        });
      })
      
      // Si problème serveur (connexion, MongoDb...)
      .catch(error => res.status(500).json({ error }));
  })
  // Si problème serveur (connexion, MongoDb...)
  .catch(error => res.status(500).json({ error }));
};