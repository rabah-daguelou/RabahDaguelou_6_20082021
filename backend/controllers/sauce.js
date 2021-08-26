const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
  // Le corps de la requête est une chaine de caractère
  // transformer la chaine en objet
  // Extraire l'objet json
  //const sauceObject= JSON.parse (req.body);
  console.log(res);
  console.log(next);

  const sauce = new Sauce({
    
        userId: "1", 
        name: req.body.name, 
        manufacturer: "Ma sauce p",
        description: "belle",
        mainPepper: "felefel",
        imageUrl: "fal.jpg",
        heat: 0,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    
    /*
    //...sauceObject,
    //Générer les segments de l'URL de l'image
    // le protocole + nom d'hote + chemin/nom du fichier
    imageUrl: `${req.protocol}://${req.getAllSauce('host')}/images/${req.file.filename}`,
    likes 	  	 : req.body.likes,
    dislikes 	   : req.body.dislikes,
    usersLiked 	 : req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,*/
  });

  sauce.save()
  .then(
    () => {
      res.status(201).json({
        message: 'Sauce enregistrée !'
      });
    }
  )
  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

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

exports.getAllSauce = (req, res, next) => {
 Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

