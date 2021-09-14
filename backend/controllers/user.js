const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { exists } = require('../models/User');
require ('dotenv').config();
const User=require('../models/User');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });  
        
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ message:"Cette adresse mail est déjà utilisée !" }));
      })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email:req.body.email})
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur introuvable!' });
    }
    
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {  
          return res.status(401).json({ error: 'Ce mot de passe est incorrect !' });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign({userId:user._id},
          process.env.TokenSecret,
          {expiresIn:'24h'}
          )         
        });
      })
        .catch(error => res.status(500).json({ error }));
  })
    .catch(error => res.status(500).json({ error }));
};