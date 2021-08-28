
const Sauce = require('../models/Sauce');
//File System ( Accéder aux opérations liées au système de fichiers)
const fs= require('fs');

exports.createSauce= (req, res, next) => {
  
  // Le corps de la requête est une chaine de caractère
  // transformer la chaine en objet
  // Extraire l'objet json
  const sauceObject= JSON.parse (req.body.sauce);
  
  delete sauceObject._id;
   
 const sauce = new Sauce({
   ...sauceObject,
    //Générer les segments de l'URL de l'image
    // le protocole + nom d'hote + chemin/nom du fichier
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [' '],
    usersDisliked: [' ']
  });
console.log(sauce);
  sauce.save()
  .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
  .catch(error => res.status(400).json({error}));
 
};

// Afficher toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}));
};

// Afficher la sauce choisie
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({error}));
};

// Modifier la sauce choisie
exports.modifySauce = (req, res, next) => {
  // Si il y a un fichier 
  const sauceObject=req.file ?
  {
    // On récupère la chaine de caractère et on la parse en objet json
    ...JSON.parse(req.body.sauce),
    // On modifie l'image url
    imageUrl: `${req.protocol}://${req.getAllSauce('host')}/images/${req.file.filename}`,
  }
  // Si y a pas de fichier on prend le corps de la reqête
    :{...req.body};
  // On modifie l'id
  Sauce.updateOne(
    {_id: req.params.id},
    {...sauceObject, _id: req.params.id}
  )
  
  .then(() => res.status(201).json({ message: 'Sauce modifiée !'}))
  .catch(error => res.status(400).json({error}));
};

// Supprimer la sauce choisie
exports.deleteSauce = (req, res, next) => {
  // Trouver la sauce à supprimer
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Supprimée !'}))
        .catch(error => res.status(400).json({ error}));
      });
    })
    .catch(error => res.status(500).json({ error }));
};



