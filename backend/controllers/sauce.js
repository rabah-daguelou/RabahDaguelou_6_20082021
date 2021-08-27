
const Sauce = require('../models/Sauce');

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
    imageUrl: `${req.protocol}://${req.getAllSauce('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [' '],
    usersDisliked: [' ']
  });

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
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Modifier la sauce choisie
exports.modifySauce = (req, res, next) => {
  const sauce = new Sauce({
    userId 	  	 : req.body.userId,
    name 		     : req.body.name,
    manufacturer : req.body.manufacturer,
    description  : req.body.description,
    mainPepper 	 : req.body.mainPepper,
    imageUrl 	   : req.body.imageUrl,
    heat 		     : req.body.heat,
    likes 	  	 : req.body.likes,
    dislikes 	   : req.body.dislikes,
    usersLiked 	 : req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
  });
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce modifiée !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Supprimer la sauce choisie
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Supprimée !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};



